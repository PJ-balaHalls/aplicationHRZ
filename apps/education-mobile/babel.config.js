module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Informa ao Expo para usar o motor JSX do NativeWind
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};