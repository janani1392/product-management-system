module.exports = {
  presets: [
    '@babel/preset-env', // Transpiles modern JavaScript features (e.g., async/await, arrow functions, etc.)
    '@babel/preset-react', // Enables JSX syntax
  ],
  // Optionally, you can add a plugin for JSX transformation
  plugins: [
    '@babel/plugin-transform-runtime', // Helps optimize code, especially for async/await
  ],
};
