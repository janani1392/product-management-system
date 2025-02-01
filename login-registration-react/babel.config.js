module.exports = {
  presets: [
    '@babel/preset-env', // For modern JavaScript features (async/await, etc.)
    '@babel/preset-react', // For JSX syntax
  ],
  overrides: [
    {
      // Ensure Babel transpiles code inside `node_modules/react-router-demo`
      test: /node_modules[\\/]react-router-demo/,
      presets: ['@babel/preset-react'], // Use @babel/preset-react for this specific package
    },
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // Optimizes async/await and other features
  ],
};
