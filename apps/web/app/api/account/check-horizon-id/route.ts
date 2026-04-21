import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/client";

// ─── Rate limiting (simple in-memory, replace with Redis/Upstash in prod) ────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, maxRequests = 30, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) return false;

  entry.count++;
  return true;
}

// ─── Reserved IDs ─────────────────────────────────────────────────────────────

const RESERVED_IDS = new Set([
  "admin", "horazion", "horizion", "suporte", "support",
  "api", "www", "mail", "root", "system", "horazion_group",
  "horazion_core", "horaziongroup", "help", "info", "contact",
  "security", "abuse", "noreply", "no-reply", "billing", "pay",
  "legal", "tos", "terms", "privacy", "cookies", "dashboard",
  "login", "register", "signup", "logout", "auth", "oauth",
  "webhook", "webhooks", "callback", "callbackurl",
]);

// ─── Validation ────────────────────────────────────────────────────────────────

function validateFormat(id: string): { valid: boolean; message?: string } {
  if (!id || typeof id !== "string") {
    return { valid: false, message: "Horizon ID é obrigatório." };
  }

  const trimmed = id.trim().toLowerCase();

  if (trimmed.length < 3) {
    return { valid: false, message: "Mínimo 3 caracteres." };
  }

  if (trimmed.length > 32) {
    return { valid: false, message: "Máximo 32 caracteres." };
  }

  if (!/^[a-z0-9_.]+$/.test(trimmed)) {
    return {
      valid: false,
      message: "Apenas letras minúsculas, números, _ e .",
    };
  }

  // Cannot start or end with . or _
  if (/^[._]|[._]$/.test(trimmed)) {
    return {
      valid: false,
      message: "Não pode iniciar ou terminar com . ou _",
    };
  }

  // Cannot have consecutive . or _
  if (/[._]{2,}/.test(trimmed)) {
    return {
      valid: false,
      message: "Não pode ter . ou _ consecutivos.",
    };
  }

  if (RESERVED_IDS.has(trimmed)) {
    return { valid: false, message: "Este ID está reservado pelo sistema." };
  }

  return { valid: true };
}

// ─── GET /api/account/check-horizon-id?id=xxx ─────────────────────────────────

export async function GET(request: NextRequest) {
  // ── Rate limiting ──────────────────────────────────────────────────────────
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        available: false,
        code: "RATE_LIMITED",
        message: "Muitas verificações. Aguarde um momento.",
      },
      { status: 429 }
    );
  }

  // ── Extract and validate parameter ────────────────────────────────────────
  const { searchParams } = new URL(request.url);
  const rawId = searchParams.get("id") || "";
  const horizonId = rawId.trim().toLowerCase();

  const formatCheck = validateFormat(horizonId);
  if (!formatCheck.valid) {
    return NextResponse.json(
      {
        available: false,
        code: "INVALID_FORMAT",
        message: formatCheck.message,
      },
      { status: 200 } // 200 so client can use the message
    );
  }

  // ── Database check ────────────────────────────────────────────────────────
  try {
    const supabase = getSupabaseAdminClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("horizon_id")
      .eq("horizon_id", horizonId)
      .maybeSingle();

    if (error) {
      console.error("[API] check-horizon-id DB error:", error);
      return NextResponse.json(
        {
          available: false,
          code: "DB_ERROR",
          message: "Erro ao verificar disponibilidade. Tente novamente.",
        },
        { status: 200 }
      );
    }

    if (data) {
      return NextResponse.json(
        {
          available: false,
          code: "TAKEN",
          message: "Este Horizon ID já está em uso.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        available: true,
        code: "AVAILABLE",
        message: "Horizon ID disponível!",
        normalized: horizonId,
      },
      {
        status: 200,
        headers: {
          // Cache for 10 seconds to reduce DB hits for same ID
          "Cache-Control": "private, max-age=10",
        },
      }
    );
  } catch (err) {
    console.error("[API] check-horizon-id unexpected error:", err);
    return NextResponse.json(
      {
        available: false,
        code: "INTERNAL_ERROR",
        message: "Serviço temporariamente indisponível.",
      },
      { status: 200 }
    );
  }
}

// ─── POST /api/account/check-horizon-id ───────────────────────────────────────
// Alternative for when ID should not be in query string

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { available: false, code: "RATE_LIMITED", message: "Muitas requisições." },
      { status: 429 }
    );
  }

  let body: { horizon_id?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { available: false, code: "INVALID_BODY", message: "Corpo da requisição inválido." },
      { status: 400 }
    );
  }

  const horizonId = (body.horizon_id || "").trim().toLowerCase();
  const formatCheck = validateFormat(horizonId);

  if (!formatCheck.valid) {
    return NextResponse.json(
      { available: false, code: "INVALID_FORMAT", message: formatCheck.message },
      { status: 200 }
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("horizon_id")
      .eq("horizon_id", horizonId)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { available: false, code: "DB_ERROR", message: "Erro ao verificar." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        available: !data,
        code: data ? "TAKEN" : "AVAILABLE",
        message: data
          ? "Este Horizon ID já está em uso."
          : "Horizon ID disponível!",
        normalized: horizonId,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { available: false, code: "INTERNAL_ERROR", message: "Serviço indisponível." },
      { status: 200 }
    );
  }
}