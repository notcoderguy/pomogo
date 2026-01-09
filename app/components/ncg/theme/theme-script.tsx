/**
 * Theme initialization script to prevent Flash of Unstyled Content
 * This script should be inlined in the document head before any stylesheets
 */

export const themeScript = `
(function() {
  const STORAGE_KEY = 'ncg-theme';
  const THEME_ATTR = 'class';
  
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }
  
  function applyTheme(theme) {
    const root = document.documentElement;
    const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
    
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    root.style.colorScheme = resolvedTheme;
  }
  
  // Apply theme immediately
  const storedTheme = getStoredTheme();
  const theme = storedTheme || 'system';
  applyTheme(theme);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    const currentTheme = getStoredTheme() || 'system';
    if (currentTheme === 'system') {
      applyTheme('system');
    }
  });
})();
`;

/**
 * Get the theme script as a React component for server-side rendering
 */
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: themeScript,
      }}
    />
  );
}
