// components/mockup/HorazionMockups.tsx
"use client";

import React, { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

// Constantes e tipos
const HZ_RED = "#B6192E";
const BROWSER_WIDTH = 320;
const BROWSER_HEIGHT = 240;
const PHONE_WIDTH = 160;
const PHONE_HEIGHT = 320;

type Variant = "edu" | "ent" | "ind";
type DisplayType = "desktop" | "mobile";

interface MockupConfig {
  variant: Variant;
  url: string;
  logoPath: string;
  message: string;
}

const CONFIGS: Record<Variant, MockupConfig> = {
  edu: {
    variant: "edu",
    url: "www.horazion.com/edu",
    logoPath: "/images/HorazionFor/HORAZION-FOREDUCATION.svg",
    message: "Um novo horizonte para sua educação",
  },
  ent: {
    variant: "ent",
    url: "www.horazion.com/ent",
    logoPath: "/images/HorazionFor/HORAZION-FORENTERPRISE.svg",
    message: "Transforme sua empresa com o poder do horizonte",
  },
  ind: {
    variant: "ind",
    url: "www.horazion.com/ind",
    logoPath: "/images/HorazionFor/HORAZION-FORINDIVIDUALS.svg",
    message: "Seu crescimento pessoal começa aqui",
  },
};

// Estilos (CSS-in-JS)
const styles: Record<string, React.CSSProperties> = {
  browser: {
    width: BROWSER_WIDTH,
    height: BROWSER_HEIGHT,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
    position: "relative",
  },
  browserBar: {
    height: 36,
    backgroundColor: "#F1F3F4",
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    borderBottom: "1px solid #E0E0E0",
  },
  windowControls: {
    display: "flex",
    gap: 6,
    marginRight: 10,
  },
  windowDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  addressBar: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    height: 28,
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    border: "1px solid #DADCE0",
  },
  addressText: {
    fontSize: 11,
    color: "#202124",
  },
  browserActions: {
    display: "flex",
    marginLeft: 10,
    gap: 8,
  },
  actionIcon: {
    width: 16,
    height: 16,
    borderRadius: 3,
    backgroundColor: "#DADCE0",
  },
  browserContent: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
    height: `calc(100% - 36px)`,
  },
  homeScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchPlaceholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  searchText: {
    fontSize: 12,
    color: "#5F6368",
  },
  splashScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  logoImage: {
    width: 140,
    height: 50,
  },
  dashboard: {
    padding: 16,
    backgroundColor: "#FAFAFA",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  dashboardLogo: {
    width: 120,
    height: 36,
    alignSelf: "center",
    marginBottom: 8,
  },
  dashboardMessage: {
    fontSize: 13,
    fontWeight: 600,
    color: HZ_RED,
    textAlign: "center",
    marginBottom: 16,
  },
  skeletonGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  skeletonCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  skeletonLine: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 6,
    width: "100%",
  },
  phoneChassis: {
    width: PHONE_WIDTH,
    height: PHONE_HEIGHT,
    backgroundColor: "#F5F5F7",
    borderRadius: 32,
    padding: 2,
    border: "1px solid #FFF",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  },
  phoneScreen: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    borderRadius: 30,
    overflow: "hidden",
    position: "relative",
  },
  dynamicIsland: {
    position: "absolute",
    top: 12,
    left: "50%",
    transform: "translateX(-50%)",
    width: 60,
    height: 20,
    backgroundColor: "#000",
    borderRadius: 10,
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  islandDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: "#333" },
  islandBar: { width: 30, height: 4, borderRadius: 2, backgroundColor: "#333" },
  phoneHomeScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FAFAFA",
  },
  appIconPlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: "#E5E5E5",
    borderRadius: 12,
    position: "absolute",
  },
  phoneIconContainer: {
    position: "absolute",
    backgroundColor: "#FFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 40,
    overflow: "hidden",
    boxShadow: `0 2px 8px ${HZ_RED}40`,
  },
  phoneIconSymbol: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: HZ_RED,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneSplashScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    zIndex: 50,
  },
  phoneLogoImage: {
    width: 80,
    height: 30,
  },
  phoneFeedContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFF",
    zIndex: 40,
    overflowY: "auto",
  },
  phoneHeader: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#FFF",
    opacity: 0.9,
    zIndex: 20,
  },
  phoneFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
    backgroundColor: "#FFF",
    opacity: 0.9,
    zIndex: 20,
  },
  phoneDashboardMessageContainer: {
    padding: 16,
    display: "flex",
    alignItems: "center",
  },
  phoneDashboardMessage: {
    fontSize: 12,
    fontWeight: 600,
    color: HZ_RED,
    textAlign: "center",
  },
  phoneSkeletonCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 12,
    margin: 12,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  phoneSkeletonLine: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 6,
    width: "100%",
  },
};

// Subcomponentes
const BrowserChrome = ({ url, children }: { url: string; children: React.ReactNode }) => (
  <div style={styles.browser}>
    <div style={styles.browserBar}>
      <div style={styles.windowControls}>
        <div style={{ ...styles.windowDot, backgroundColor: "#FF5F56" }} />
        <div style={{ ...styles.windowDot, backgroundColor: "#FFBD2E" }} />
        <div style={{ ...styles.windowDot, backgroundColor: "#27C93F" }} />
      </div>
      <div style={styles.addressBar}>
        <span style={styles.addressText}>{url}</span>
      </div>
      <div style={styles.browserActions}>
        <div style={styles.actionIcon} />
        <div style={styles.actionIcon} />
        <div style={styles.actionIcon} />
      </div>
    </div>
    <div style={styles.browserContent}>{children}</div>
  </div>
);

const DashboardSkeleton = ({ logoPath, message }: { logoPath: string; message: string }) => (
  <div style={styles.dashboard}>
    <img src={logoPath} style={styles.dashboardLogo} alt="Logo" />
    <div style={styles.dashboardMessage}>{message}</div>
    <div style={styles.skeletonGrid}>
      {[...Array(4)].map((_, i) => (
        <div key={i} style={styles.skeletonCard}>
          <div style={styles.skeletonLine} />
          <div style={{ ...styles.skeletonLine, width: "60%" }} />
          <div style={{ ...styles.skeletonLine, width: "80%" }} />
        </div>
      ))}
    </div>
  </div>
);

// Mockup Desktop
const DesktopMockup = ({ config }: { config: MockupConfig }) => {
  const expandProgress = useMotionValue(0);
  const contentOpacity = useMotionValue(0);

  useEffect(() => {
    const runAnimation = async () => {
      expandProgress.set(0);
      contentOpacity.set(0);

      await animate(expandProgress, 0.1, { duration: 0.3, ease: "easeOut" });
      await animate(expandProgress, 1, { duration: 1.2, ease: [0.22, 1, 0.36, 1] });
      await animate(contentOpacity, 1, { duration: 0.8, delay: 0.2 });

      const timeout = setTimeout(() => {
        animate(contentOpacity, 0, { duration: 0.6 }).then(() => runAnimation());
      }, 15000);

      return () => clearTimeout(timeout);
    };

    const cleanup = runAnimation();
    return () => {
      cleanup?.then?.((clear) => clear?.());
    };
  }, []);

  const t = useTransform(expandProgress, [0.1, 1], [0, 1]);
  const overlayOpacity = useTransform(expandProgress, [0, 0.1, 1], [0, 1, 1]);
  const overlayScale = useTransform(t, [0, 1], [0.95, 1]);
  const splashOpacity = useTransform(expandProgress, [0.2, 0.5], [1, 0]);
  const homeOpacity = useTransform(expandProgress, [0, 0.2], [1, 0]);

  return (
    <BrowserChrome url={config.url}>
      <motion.div style={{ ...styles.homeScreen, opacity: homeOpacity }}>
        <div style={styles.searchPlaceholder}>
          <Sparkles size={32} color={HZ_RED} />
          <span style={styles.searchText}>Pesquise ou digite um endereço</span>
        </div>
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#FFF",
          zIndex: 40,
          opacity: overlayOpacity,
          scale: overlayScale,
        }}
      >
        <motion.div style={{ ...styles.splashScreen, opacity: splashOpacity }}>
          <img src={config.logoPath} style={styles.logoImage} alt="Logo" />
        </motion.div>

        <motion.div style={{ position: "absolute", inset: 0, opacity: contentOpacity }}>
          <DashboardSkeleton logoPath={config.logoPath} message={config.message} />
        </motion.div>
      </motion.div>
    </BrowserChrome>
  );
};

// Mockup Mobile
const PhoneMockup = ({ config }: { config: MockupConfig }) => {
  const expandProgress = useMotionValue(0);
  const contentOpacity = useMotionValue(0);
  const scrollProgress = useMotionValue(0);

  const ICON_SIZE = 48;
  const GAP = 24;
  const GRID_TOP = 80;
  const GRID_LEFT = 35;
  const CENTER_TOP = GRID_TOP + ICON_SIZE + GAP;
  const CENTER_LEFT = GRID_LEFT + ICON_SIZE + GAP;

  useEffect(() => {
    const runAnimation = async () => {
      expandProgress.set(0);
      contentOpacity.set(0);
      scrollProgress.set(0);

      await animate(expandProgress, 0.1, { duration: 0.3, ease: "easeOut" });
      await animate(expandProgress, 1, { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 });
      await animate(contentOpacity, 1, { duration: 0.8, delay: 0.2 });
      await animate(scrollProgress, 1, { duration: 12, ease: "easeInOut", delay: 0.6 });

      const timeout = setTimeout(() => {
        animate(contentOpacity, 0, { duration: 0.6 }).then(() => runAnimation());
      }, 15000);

      return () => clearTimeout(timeout);
    };

    const cleanup = runAnimation();
    return () => {
      cleanup?.then?.((clear) => clear?.());
    };
  }, []);

  const t = useTransform(expandProgress, [0.1, 1], [0, 1]);
  const iconWidth = useTransform(t, [0, 1], [ICON_SIZE, PHONE_WIDTH]);
  const iconHeight = useTransform(t, [0, 1], [ICON_SIZE, PHONE_HEIGHT]);
  const iconTop = useTransform(t, [0, 1], [CENTER_TOP, 0]);
  const iconLeft = useTransform(t, [0, 1], [CENTER_LEFT, 0]);
  const iconBorderRadius = useTransform(t, [0, 1], [16, 0]);
  const iconScale = useTransform(expandProgress, [0, 0.1], [1, 0.9]);

  const iconSymbolOpacity = useTransform(expandProgress, [0.1, 0.2], [1, 0]);
  const splashOpacity = useTransform(
    [expandProgress, contentOpacity],
    ([p, c]: number[]) => (p >= 0.8 && p <= 1 ? 1 - c : 0)
  );
  const homeOpacity = useTransform(expandProgress, [0.2, 0.5], [1, 0]);
  const feedTranslateY = useTransform(scrollProgress, [0, 1], [0, -400]);

  return (
    <div style={styles.phoneChassis}>
      <div style={styles.phoneScreen}>
        <div style={styles.dynamicIsland}>
          <div style={styles.islandDot} />
          <div style={styles.islandBar} />
        </div>

        <motion.div style={{ ...styles.phoneHomeScreen, opacity: homeOpacity }}>
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => {
              const isCenter = row === 1 && col === 1;
              if (isCenter) return null;
              return (
                <div
                  key={`${row}-${col}`}
                  style={{
                    ...styles.appIconPlaceholder,
                    top: GRID_TOP + row * (ICON_SIZE + GAP),
                    left: GRID_LEFT + col * (ICON_SIZE + GAP),
                  }}
                />
              );
            })
          )}
        </motion.div>

        <motion.div
          style={{
            ...styles.phoneIconContainer,
            width: iconWidth,
            height: iconHeight,
            top: iconTop,
            left: iconLeft,
            borderRadius: iconBorderRadius,
            scale: iconScale,
          }}
        >
          <motion.div style={{ ...styles.phoneIconSymbol, opacity: iconSymbolOpacity }}>
            <Sparkles size={24} color="white" />
          </motion.div>

          <motion.div style={{ ...styles.phoneSplashScreen, opacity: splashOpacity }}>
            <img src={config.logoPath} style={styles.phoneLogoImage} alt="Logo" />
          </motion.div>

          <motion.div
            style={{
              ...styles.phoneFeedContainer,
              opacity: contentOpacity,
              y: feedTranslateY,
            }}
          >
            <div style={styles.phoneHeader} />
            <div style={{ paddingTop: 70 }}>
              <div style={styles.phoneDashboardMessageContainer}>
                <span style={styles.phoneDashboardMessage}>{config.message}</span>
              </div>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={styles.phoneSkeletonCard}>
                  <div style={styles.phoneSkeletonLine} />
                  <div style={{ ...styles.phoneSkeletonLine, width: "60%" }} />
                </div>
              ))}
            </div>
            <div style={styles.phoneFooter} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Componente exportado
interface HorazionMockupsProps {
  variant: Variant;
  type: DisplayType;
}

export const HorazionMockups: React.FC<HorazionMockupsProps> = ({ variant, type }) => {
  const config = CONFIGS[variant];
  return type === "desktop" ? <DesktopMockup config={config} /> : <PhoneMockup config={config} />;
};

export default HorazionMockups;