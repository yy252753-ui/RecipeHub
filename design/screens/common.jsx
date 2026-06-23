// common.jsx — RecipeHub shared primitives + mock data
// Built on the Wanted Design System tokens (colors_and_type.css).
// Exports everything to window for the per-screen Babel scripts.

// ── Icon (inline SVG → renders in screenshots/exports, recolors via color) ──
// Wanted Design System icon paths (currentColor). vb = native viewBox.
const ICONS = {
  search: ['0 0 19.3 19.3', '<path d="M 7.9 0 C 3.537 0 0 3.537 0 7.9 C 0 12.263 3.537 15.8 7.9 15.8 C 9.757 15.8 11.465 15.159 12.814 14.086 L 17.764 19.036 C 18.115 19.388 18.685 19.388 19.036 19.036 C 19.388 18.685 19.388 18.115 19.036 17.764 L 14.086 12.813 C 15.159 11.465 15.8 9.757 15.8 7.9 C 15.8 3.537 12.263 0 7.9 0 Z M 1.8 7.9 C 1.8 4.531 4.531 1.8 7.9 1.8 C 11.269 1.8 14 4.531 14 7.9 C 14 11.269 11.269 14 7.9 14 C 4.531 14 1.8 11.269 1.8 7.9 Z" fill="currentColor" fill-rule="evenodd"/>'],
  clock: ['0 0 19.8 19.8', '<path d="M 9.4 4.5 C 9.897 4.5 10.3 4.903 10.3 5.4 L 10.3 10.027 L 12.511 12.238 C 12.862 12.59 12.862 13.159 12.511 13.511 C 12.159 13.862 11.59 13.862 11.238 13.511 L 8.763 11.036 C 8.584 10.856 8.496 10.62 8.5 10.385 L 8.5 5.4 C 8.5 4.903 8.903 4.5 9.4 4.5 Z" fill="currentColor"/><path d="M 9.9 0 C 4.432 0 0 4.432 0 9.9 C 0 15.368 4.432 19.8 9.9 19.8 C 15.368 19.8 19.8 15.368 19.8 9.9 C 19.8 4.432 15.368 0 9.9 0 Z M 1.8 9.9 C 1.8 5.426 5.426 1.8 9.9 1.8 C 14.373 1.8 18 5.426 18 9.9 C 18 14.374 14.373 18 9.9 18 C 5.426 18 1.8 14.374 1.8 9.9 Z" fill="currentColor" fill-rule="evenodd"/>'],
  bookmark: ['0 0 15.8 19.8', '<path d="M 4.065 0 L 11.735 0 C 12.265 0 12.716 0 13.087 0.03 C 13.476 0.062 13.855 0.132 14.217 0.316 C 14.762 0.594 15.206 1.038 15.484 1.583 C 15.668 1.945 15.738 2.324 15.77 2.713 C 15.8 3.084 15.8 3.535 15.8 4.065 L 15.8 18.9 C 15.8 19.225 15.625 19.525 15.341 19.684 C 15.058 19.844 14.711 19.838 14.433 19.669 L 7.9 15.703 L 1.367 19.669 C 1.089 19.838 0.742 19.844 0.459 19.684 C 0.175 19.525 0 19.225 0 18.9 L 0 4.065 C 0 3.535 0 3.084 0.03 2.713 C 0.062 2.324 0.132 1.945 0.316 1.583 C 0.594 1.038 1.038 0.594 1.583 0.316 C 1.945 0.132 2.324 0.062 2.713 0.03 C 3.084 0 3.535 0 4.065 0 Z M 3.7 1.8 C 2.885 1.8 2.692 1.811 2.56 1.854 C 2.225 1.963 1.963 2.225 1.854 2.56 C 1.811 2.692 1.8 2.886 1.8 3.7 L 1.8 17.301 L 7.433 13.881 C 7.72 13.707 8.08 13.707 8.367 13.881 L 14 17.301 L 14 3.7 C 14 2.886 13.989 2.692 13.946 2.56 C 13.837 2.225 13.575 1.963 13.24 1.854 C 13.108 1.811 12.915 1.8 12.1 1.8 L 3.7 1.8 Z" fill="currentColor" fill-rule="evenodd"/>'],
  'bookmark-fill': ['0 0 15.8 19.8', '<path d="M 4.065 0 C 3.535 0 3.084 0 2.713 0.03 C 2.324 0.062 1.945 0.132 1.583 0.316 C 1.038 0.594 0.594 1.038 0.316 1.583 C 0.132 1.945 0.062 2.324 0.03 2.713 C 0 3.084 0 3.535 0 4.065 L 0 18.9 C 0 19.225 0.175 19.525 0.459 19.684 C 0.742 19.844 1.089 19.838 1.367 19.669 L 7.9 15.703 L 14.433 19.669 C 14.711 19.838 15.058 19.844 15.341 19.684 C 15.625 19.525 15.8 19.225 15.8 18.9 L 15.8 4.065 C 15.8 3.535 15.8 3.084 15.77 2.713 C 15.738 2.324 15.668 1.945 15.484 1.583 C 15.206 1.038 14.762 0.594 14.217 0.316 C 13.855 0.132 13.476 0.062 13.087 0.03 C 12.716 0 12.265 0 11.735 0 L 4.065 0 Z" fill="currentColor"/>'],
  write: ['0 0 19.068 19.071', '<path d="M 18.286 0.781 C 17.245 -0.26 15.556 -0.26 14.514 0.781 L 5.264 10.031 C 5.095 10.2 5 10.429 5 10.668 L 5 13.168 C 5 13.665 5.403 14.068 5.9 14.068 L 8.4 14.068 C 8.639 14.068 8.868 13.973 9.037 13.804 L 18.286 4.554 C 19.328 3.512 19.328 1.823 18.286 0.781 Z M 15.786 2.054 C 16.125 1.715 16.675 1.715 17.014 2.054 C 17.352 2.393 17.352 2.942 17.014 3.281 L 8.027 12.268 L 6.8 12.268 L 6.8 11.041 L 15.786 2.054 Z" fill="currentColor" fill-rule="evenodd"/><path d="M 9.003 1.271 C 9.498 1.271 9.9 1.672 9.9 2.168 C 9.9 2.663 9.498 3.065 9.003 3.065 L 3.7 3.065 C 2.886 3.065 2.692 3.076 2.56 3.119 C 2.225 3.228 1.963 3.49 1.854 3.825 C 1.811 3.957 1.8 4.151 1.8 4.965 L 1.8 15.365 C 1.8 16.18 1.811 16.374 1.854 16.505 C 1.963 16.84 2.225 17.103 2.56 17.211 C 2.692 17.254 2.886 17.265 3.7 17.265 L 14.1 17.265 C 14.915 17.265 15.108 17.254 15.24 17.211 C 15.575 17.103 15.837 16.84 15.946 16.505 C 15.989 16.374 16 16.18 16 15.365 L 16 10.068 C 16 9.571 16.403 9.168 16.9 9.168 C 17.397 9.168 17.8 9.571 17.8 10.068 L 17.8 15.006 C 17.8 15.536 17.8 15.987 17.77 16.358 C 17.738 16.747 17.668 17.125 17.484 17.487 C 17.206 18.033 16.762 18.477 16.217 18.755 C 15.855 18.939 15.476 19.009 15.087 19.04 C 14.716 19.071 14.265 19.071 13.735 19.071 L 4.065 19.071 C 3.535 19.071 3.084 19.071 2.713 19.04 C 2.324 19.009 1.945 18.939 1.583 18.755 C 1.038 18.477 0.594 18.033 0.316 17.487 C 0.132 17.125 0.062 16.747 0.03 16.358 C 0 15.987 0 15.536 0 15.006 L 0 5.335 C 0 4.805 0 4.354 0.03 3.984 C 0.062 3.595 0.132 3.216 0.316 2.854 C 0.594 2.308 1.038 1.865 1.583 1.587 C 1.945 1.402 2.324 1.333 2.713 1.301 C 3.084 1.271 3.535 1.271 4.064 1.271 L 9.003 1.271 Z" fill="currentColor"/>'],
  bubble: ['0 0 19.3 19.3', '<path d="M 9.65 1.8 C 5.315 1.8 1.8 5.315 1.8 9.65 C 1.8 13.985 5.315 17.5 9.65 17.5 C 11.011 17.5 12.289 17.154 13.403 16.547 C 13.607 16.435 13.847 16.407 14.071 16.468 L 16.185 17.045 C 16.645 17.17 16.93 17.247 17.139 17.284 C 17.213 17.297 17.261 17.302 17.287 17.303 C 17.293 17.298 17.298 17.293 17.303 17.287 C 17.302 17.261 17.297 17.214 17.284 17.139 C 17.247 16.93 17.17 16.645 17.045 16.185 L 16.468 14.071 C 16.407 13.847 16.435 13.607 16.546 13.403 C 17.154 12.289 17.5 11.011 17.5 9.65 C 17.5 5.315 13.985 1.8 9.65 1.8 Z M 0 9.65 C 0 4.32 4.32 0 9.65 0 C 14.979 0 19.3 4.32 19.3 9.65 C 19.3 11.188 18.939 12.645 18.297 13.937 L 18.792 15.75 C 18.904 16.16 19.003 16.526 19.057 16.826 C 19.11 17.131 19.147 17.517 19 17.903 C 18.807 18.408 18.408 18.807 17.902 19 C 17.517 19.147 17.131 19.11 16.826 19.057 C 16.526 19.004 16.16 18.904 15.75 18.792 L 13.937 18.298 C 12.645 18.939 11.188 19.3 9.65 19.3 C 4.32 19.3 0 14.98 0 9.65 Z" fill="currentColor" fill-rule="evenodd"/>'],
  person: ['0 0 17.8 18.799', '<path d="M 8.9 0 C 6.194 0 4 2.194 4 4.9 C 4 7.606 6.194 9.8 8.9 9.8 C 11.606 9.8 13.8 7.606 13.8 4.9 C 13.8 2.194 11.606 0 8.9 0 Z M 5.8 4.9 C 5.8 3.188 7.188 1.8 8.9 1.8 C 10.612 1.8 12 3.188 12 4.9 C 12 6.612 10.612 8 8.9 8 C 7.188 8 5.8 6.612 5.8 4.9 Z" fill="currentColor" fill-rule="evenodd"/><path d="M 8.9 10.998 C 6.588 10.998 4.431 11.451 2.816 12.321 C 1.203 13.189 0 14.565 0 16.398 L 0 16.726 C 0 16.913 0 17.103 0.013 17.265 C 0.028 17.446 0.064 17.67 0.18 17.898 C 0.338 18.209 0.59 18.461 0.901 18.62 C 1.129 18.736 1.353 18.771 1.534 18.786 C 1.697 18.799 1.887 18.799 2.073 18.799 L 15.727 18.799 C 15.913 18.799 16.104 18.799 16.266 18.785 C 16.447 18.771 16.671 18.735 16.899 18.619 C 17.21 18.46 17.462 18.208 17.62 17.898 C 17.736 17.669 17.772 17.445 17.787 17.264 C 17.8 17.102 17.8 16.912 17.8 16.725 L 17.8 16.398 C 17.8 14.565 16.597 13.189 14.984 12.321 C 13.369 11.451 11.212 10.998 8.9 10.998 Z M 1.8 16.398 C 1.8 15.471 2.388 14.596 3.67 13.905 C 4.951 13.215 6.794 12.798 8.9 12.798 C 11.006 12.798 12.849 13.215 14.13 13.905 C 15.412 14.596 16 15.471 16 16.398 L 15.998 16.997 L 1.802 16.998 L 1.8 16.398 Z" fill="currentColor" fill-rule="evenodd"/>'],
  'person-fill': ['0 0 17.8 18.547', '<path d="M 4.5 4.4 C 4.5 1.97 6.47 0 8.9 0 C 11.33 0 13.3 1.97 13.3 4.4 C 13.3 6.83 11.33 8.8 8.9 8.8 C 6.47 8.8 4.5 6.83 4.5 4.4 Z" fill="currentColor"/><path d="M 8.9 10.746 C 6.588 10.746 4.431 11.199 2.816 12.068 C 1.203 12.937 0 14.312 0 16.146 L 0 16.474 C 0 16.66 0 16.85 0.013 17.013 C 0.028 17.194 0.064 17.418 0.18 17.646 C 0.338 17.957 0.59 18.209 0.901 18.367 C 1.129 18.484 1.353 18.519 1.534 18.534 C 1.697 18.547 1.887 18.547 2.073 18.547 L 15.727 18.546 C 15.913 18.546 16.103 18.546 16.266 18.533 C 16.447 18.518 16.671 18.483 16.899 18.366 C 17.21 18.208 17.462 17.956 17.62 17.645 C 17.736 17.417 17.772 17.193 17.787 17.012 C 17.8 16.85 17.8 16.66 17.8 16.473 L 17.8 16.146 C 17.8 14.312 16.597 12.937 14.984 12.068 C 13.369 11.199 11.212 10.746 8.9 10.746 Z" fill="currentColor"/>'],
  home: ['0 0 18.8 19.171', '<path d="M 9.762 0.047 C 9.525 -0.016 9.275 -0.016 9.039 0.047 C 8.758 0.122 8.525 0.304 8.402 0.4 L 8.367 0.427 L 1.534 5.653 C 1.147 5.948 0.821 6.197 0.578 6.521 C 0.365 6.806 0.206 7.128 0.109 7.47 C -0.001 7.86 0 8.27 0 8.757 L 0 15.106 C 0 15.636 0 16.087 0.03 16.457 C 0.062 16.847 0.132 17.225 0.316 17.587 C 0.594 18.133 1.038 18.576 1.584 18.854 C 1.945 19.039 2.324 19.109 2.713 19.14 C 3.084 19.171 3.535 19.171 4.065 19.171 L 9.39 19.171 C 9.393 19.171 9.397 19.171 9.4 19.171 C 9.404 19.171 9.407 19.171 9.411 19.171 L 14.735 19.171 C 15.265 19.171 15.717 19.171 16.087 19.14 C 16.476 19.109 16.855 19.039 17.217 18.854 C 17.762 18.576 18.206 18.133 18.484 17.587 C 18.668 17.225 18.738 16.847 18.77 16.457 C 18.8 16.087 18.8 15.636 18.8 15.106 L 18.8 8.757 C 18.801 8.27 18.801 7.86 18.691 7.47 C 18.594 7.128 18.435 6.806 18.222 6.521 C 17.979 6.197 17.653 5.948 17.266 5.653 L 10.433 0.427 L 10.398 0.4 C 10.275 0.304 10.042 0.122 9.762 0.047 Z M 10.3 17.37 L 15.1 17.37 C 15.915 17.37 16.108 17.359 16.24 17.317 C 16.575 17.208 16.837 16.945 16.946 16.61 C 16.989 16.479 17 16.285 17 15.47 L 17 8.654 C 17 8.234 16.997 8.138 16.982 8.058 C 16.944 7.858 16.853 7.672 16.717 7.522 C 16.662 7.461 16.588 7.4 16.254 7.145 L 9.4 1.903 L 2.546 7.145 C 2.212 7.4 2.138 7.461 2.084 7.522 C 1.947 7.672 1.856 7.858 1.819 8.058 C 1.804 8.138 1.8 8.234 1.8 8.654 L 1.8 15.47 C 1.8 16.285 1.811 16.479 1.854 16.61 C 1.963 16.945 2.225 17.208 2.56 17.317 C 2.692 17.359 2.886 17.37 3.7 17.37 L 8.5 17.37 L 8.5 11.771 C 8.5 11.274 8.903 10.871 9.4 10.871 C 9.897 10.871 10.3 11.274 10.3 11.771 L 10.3 17.37 Z" fill="currentColor" fill-rule="evenodd"/>'],
  'home-fill': ['0 0 18.8 19.171', '<path d="M 9.039 0.047 C 9.275 -0.016 9.525 -0.016 9.762 0.047 C 10.042 0.122 10.275 0.304 10.398 0.4 L 10.433 0.427 L 17.266 5.653 C 17.653 5.948 17.979 6.197 18.222 6.521 C 18.435 6.806 18.594 7.128 18.691 7.47 C 18.801 7.86 18.801 8.27 18.8 8.757 L 18.8 15.106 C 18.8 15.636 18.8 16.087 18.77 16.457 C 18.738 16.847 18.668 17.225 18.484 17.587 C 18.206 18.133 17.762 18.576 17.217 18.854 C 16.855 19.039 16.476 19.109 16.087 19.14 C 15.717 19.171 15.265 19.171 14.736 19.171 L 10.3 19.171 L 10.3 11.771 C 10.3 11.274 9.897 10.871 9.4 10.871 C 8.903 10.871 8.5 11.274 8.5 11.771 L 8.5 19.171 L 4.065 19.171 C 3.535 19.171 3.084 19.171 2.713 19.14 C 2.324 19.109 1.945 19.039 1.584 18.854 C 1.038 18.576 0.594 18.133 0.316 17.587 C 0.132 17.225 0.062 16.847 0.03 16.457 C 0 16.087 0 15.636 0 15.106 L 0 8.757 C 0 8.27 -0.001 7.86 0.109 7.47 C 0.206 7.128 0.365 6.806 0.578 6.521 C 0.821 6.197 1.147 5.948 1.534 5.653 L 8.367 0.427 L 8.402 0.4 C 8.525 0.304 8.758 0.122 9.039 0.047 Z" fill="currentColor"/>'],
  bell: ['0 0 18.325 19.8', '<path d="M 9.163 0 C 6.938 0 5.108 0.788 3.851 2.274 C 2.611 3.74 2.013 5.783 2.013 8.15 L 2.013 8.9 C 2.013 11.365 1.33 12.825 0.357 13.768 C -0.025 14.138 -0.065 14.65 0.072 15.026 C 0.21 15.409 0.591 15.8 1.162 15.8 L 17.163 15.8 C 17.735 15.8 18.115 15.409 18.254 15.026 C 18.39 14.65 18.351 14.138 17.969 13.768 C 16.996 12.825 16.313 11.365 16.313 8.9 L 16.313 8.15 C 16.313 5.783 15.715 3.74 14.475 2.274 C 13.217 0.788 11.388 0 9.163 0 Z M 3.813 8.15 C 3.813 6.065 4.34 4.483 5.225 3.437 C 6.092 2.411 7.388 1.8 9.163 1.8 C 10.938 1.8 12.233 2.411 13.101 3.437 C 13.986 4.483 14.513 6.065 14.513 8.15 L 14.513 8.9 C 14.513 11.063 14.981 12.727 15.832 14 L 2.494 14 C 3.345 12.727 3.813 11.063 3.813 8.9 L 3.813 8.15 Z" fill="currentColor" fill-rule="evenodd"/><path d="M 7.163 18 C 6.666 18 6.263 18.403 6.263 18.9 C 6.263 19.397 6.666 19.8 7.163 19.8 L 11.163 19.8 C 11.66 19.8 12.063 19.397 12.063 18.9 C 12.063 18.403 11.66 18 11.163 18 L 7.163 18 Z" fill="currentColor"/>'],
  share: ['0 0 18.3 19.299', '<path d="M 14.9 0 C 13.022 0 11.5 1.522 11.5 3.4 C 11.5 3.667 11.531 3.926 11.589 4.175 L 5.852 7.293 C 5.233 6.65 4.363 6.249 3.4 6.249 C 1.522 6.249 0 7.771 0 9.649 C 0 11.527 1.522 13.049 3.4 13.049 C 4.363 13.049 5.232 12.649 5.85 12.006 L 11.589 15.125 C 11.531 15.373 11.5 15.633 11.5 15.899 C 11.5 17.777 13.022 19.299 14.9 19.299 C 16.778 19.299 18.3 17.777 18.3 15.899 C 18.3 14.021 16.778 12.499 14.9 12.499 C 13.937 12.499 13.067 12.9 12.448 13.543 L 6.711 10.425 C 6.769 10.176 6.8 9.916 6.8 9.649 C 6.8 9.383 6.769 9.123 6.711 8.875 L 12.449 5.756 C 13.068 6.4 13.937 6.8 14.9 6.8 C 16.778 6.8 18.3 5.278 18.3 3.4 C 18.3 1.522 16.778 0 14.9 0 Z M 13.3 3.4 C 13.3 2.516 14.016 1.8 14.9 1.8 C 15.784 1.8 16.5 2.516 16.5 3.4 C 16.5 4.284 15.784 5 14.9 5 C 14.016 5 13.3 4.284 13.3 3.4 Z M 1.8 9.649 C 1.8 8.765 2.516 8.049 3.4 8.049 C 4.284 8.049 5 8.765 5 9.649 C 5 10.533 4.284 11.249 3.4 11.249 C 2.516 11.249 1.8 10.533 1.8 9.649 Z M 13.3 15.899 C 13.3 15.015 14.016 14.299 14.9 14.299 C 15.784 14.299 16.5 15.015 16.5 15.899 C 16.5 16.783 15.784 17.499 14.9 17.499 C 14.016 17.499 13.3 16.783 13.3 15.899 Z" fill="currentColor" fill-rule="evenodd"/>'],
  filter: ['0 0 18.677 18.865', '<path d="M 3.245 0 L 15.432 0 C 15.98 0 16.451 0 16.818 0.033 C 17.169 0.064 17.631 0.137 17.997 0.444 C 18.457 0.829 18.708 1.409 18.674 2.008 C 18.647 2.485 18.383 2.871 18.166 3.149 C 17.939 3.439 17.616 3.782 17.241 4.181 L 12.239 9.506 L 12.239 15.855 L 12.239 15.871 C 12.24 15.938 12.244 16.153 12.173 16.358 C 12.115 16.526 12.02 16.679 11.896 16.806 C 11.744 16.961 11.551 17.054 11.489 17.083 L 11.476 17.09 L 8.415 18.62 C 8.319 18.668 8.199 18.728 8.09 18.771 C 7.975 18.816 7.744 18.895 7.463 18.854 C 7.137 18.805 6.844 18.625 6.655 18.354 C 6.492 18.121 6.46 17.88 6.449 17.756 C 6.438 17.64 6.438 17.506 6.439 17.398 L 6.439 9.506 L 1.436 4.181 C 1.061 3.782 0.738 3.439 0.511 3.149 C 0.294 2.871 0.03 2.485 0.003 2.008 C -0.031 1.409 0.22 0.829 0.68 0.444 C 1.046 0.137 1.508 0.064 1.859 0.033 C 2.226 0 2.697 0 3.245 0 Z M 1.827 1.968 L 7.995 8.534 C 8.151 8.701 8.239 8.921 8.239 9.15 L 8.239 16.696 L 10.439 15.596 L 10.439 9.15 C 10.439 8.921 10.526 8.701 10.683 8.534 L 16.85 1.968 C 16.91 1.905 16.865 1.8 16.777 1.8 L 1.9 1.8 C 1.812 1.8 1.767 1.905 1.827 1.968 Z" fill="currentColor" fill-rule="evenodd"/>'],
  trash: ['0 0 17.8 20.298', '<path d="M 6.9 8.747 C 7.397 8.747 7.8 9.149 7.8 9.647 L 7.8 14.647 C 7.8 15.144 7.397 15.547 6.9 15.547 C 6.403 15.547 6 15.144 6 14.647 L 6 9.647 C 6 9.149 6.403 8.747 6.9 8.747 Z" fill="currentColor"/><path d="M 10.9 8.747 C 11.397 8.747 11.8 9.149 11.8 9.647 L 11.8 14.647 C 11.8 15.144 11.397 15.547 10.9 15.547 C 10.403 15.547 10 15.144 10 14.647 L 10 9.647 C 10 9.149 10.403 8.747 10.9 8.747 Z" fill="currentColor"/><path d="M 16.9 3.997 L 13.3 3.997 C 13.3 3.496 13.299 3.068 13.27 2.713 C 13.238 2.324 13.168 1.945 12.984 1.583 C 12.706 1.038 12.262 0.594 11.716 0.316 C 11.354 0.132 10.976 0.062 10.587 0.03 C 10.216 0 9.765 0 9.235 0 L 8.564 0 C 8.035 0 7.583 0 7.213 0.03 C 6.824 0.062 6.445 0.132 6.083 0.316 C 5.538 0.594 5.094 1.038 4.816 1.583 C 4.632 1.945 4.562 2.324 4.53 2.713 C 4.501 3.068 4.5 3.496 4.5 3.997 L 0.9 3.997 C 0.403 3.997 0 4.4 0 4.897 C 0 5.394 0.403 5.797 0.9 5.797 L 1.5 5.797 L 1.5 16.233 C 1.5 16.763 1.5 17.214 1.53 17.585 C 1.562 17.974 1.632 18.353 1.816 18.714 C 2.094 19.26 2.538 19.704 3.083 19.982 C 3.445 20.166 3.824 20.236 4.213 20.268 C 4.583 20.298 5.035 20.298 5.564 20.298 L 12.235 20.298 C 12.765 20.298 13.216 20.298 13.587 20.268 C 13.976 20.236 14.354 20.166 14.716 19.982 C 15.262 19.704 15.706 19.26 15.984 18.714 C 16.168 18.353 16.238 17.974 16.27 17.585 C 16.3 17.214 16.3 16.763 16.3 16.233 L 16.3 5.797 L 16.9 5.797 C 17.397 5.797 17.8 5.394 17.8 4.897 C 17.8 4.4 17.397 3.997 16.9 3.997 Z M 11.5 3.997 L 6.3 3.997 L 6.3 3.691 C 6.3 2.876 6.311 2.682 6.354 2.551 C 6.463 2.216 6.725 1.954 7.06 1.845 C 7.192 1.802 7.386 1.791 8.2 1.791 L 9.6 1.791 C 10.415 1.791 10.609 1.802 10.74 1.845 C 11.075 1.954 11.338 2.216 11.446 2.551 C 11.489 2.682 11.5 2.876 11.5 3.691 L 11.5 3.997 Z M 3.3 16.591 L 3.3 5.797 L 14.5 5.797 L 14.5 16.591 C 14.5 17.406 14.489 17.6 14.446 17.731 C 14.338 18.066 14.075 18.329 13.74 18.438 C 13.609 18.48 13.415 18.491 12.6 18.491 L 5.2 18.491 C 4.386 18.491 4.192 18.48 4.06 18.438 C 3.725 18.329 3.463 18.066 3.354 17.731 C 3.311 17.6 3.3 17.406 3.3 16.591 Z" fill="currentColor" fill-rule="evenodd"/>'],
  close: ['0 0 14.8 14.8', '<path d="M 0.264 0.264 C 0.615 -0.088 1.185 -0.088 1.536 0.264 L 7.4 6.127 L 13.264 0.264 C 13.615 -0.088 14.185 -0.088 14.536 0.264 C 14.888 0.615 14.888 1.185 14.536 1.536 L 8.673 7.4 L 14.536 13.264 C 14.888 13.615 14.888 14.185 14.536 14.536 C 14.185 14.888 13.615 14.888 13.264 14.536 L 7.4 8.673 L 1.536 14.536 C 1.185 14.888 0.615 14.888 0.264 14.536 C -0.088 14.185 -0.088 13.615 0.264 13.264 L 6.127 7.4 L 0.264 1.536 C -0.088 1.185 -0.088 0.615 0.264 0.264 Z" fill="currentColor"/>'],
  'document-text': ['0 0 16.3 19.8', '<path d="M 4 11.4 C 4 10.902 4.403 10.5 4.9 10.5 L 8.9 10.5 C 9.397 10.5 9.8 10.902 9.8 11.4 C 9.8 11.897 9.397 12.3 8.9 12.3 L 4.9 12.3 C 4.403 12.3 4 11.897 4 11.4 Z" fill="currentColor"/><path d="M 4 14.9 C 4 14.403 4.403 14 4.9 14 L 8.9 14 C 9.397 14 9.8 14.403 9.8 14.9 C 9.8 15.397 9.397 15.8 8.9 15.8 L 4.9 15.8 C 4.403 15.8 4 15.397 4 14.9 Z" fill="currentColor"/><path d="M 9.429 0.053 C 9.206 -0.001 8.979 0 8.787 0 L 8.737 0 L 4.065 0 C 3.535 0 3.084 0 2.713 0.03 C 2.324 0.062 1.945 0.132 1.583 0.316 C 1.038 0.594 0.594 1.038 0.316 1.584 C 0.132 1.946 0.062 2.324 0.03 2.713 C 0 3.084 0 3.535 0 4.065 L 0 15.736 C 0 16.265 0 16.717 0.03 17.087 C 0.062 17.476 0.132 17.855 0.316 18.217 C 0.594 18.762 1.038 19.206 1.583 19.484 C 1.945 19.668 2.324 19.738 2.713 19.77 C 3.084 19.8 3.535 19.8 4.065 19.8 L 12.235 19.8 C 12.765 19.8 13.216 19.8 13.587 19.77 C 13.976 19.738 14.355 19.668 14.717 19.484 C 15.262 19.206 15.706 18.762 15.984 18.217 C 16.168 17.855 16.238 17.476 16.27 17.087 C 16.3 16.717 16.3 16.265 16.3 15.736 L 16.3 7.562 L 16.3 7.512 C 16.3 7.32 16.301 7.093 16.247 6.87 C 16.201 6.676 16.124 6.491 16.02 6.321 C 15.9 6.126 15.739 5.965 15.603 5.83 L 15.568 5.795 L 10.505 0.732 L 10.469 0.697 C 10.334 0.561 10.174 0.4 9.978 0.28 C 9.808 0.176 9.623 0.099 9.429 0.053 Z M 8.75 1.8 C 8.746 1.8 8.742 1.8 8.737 1.8 L 4.1 1.8 C 3.525 1.8 3.148 1.801 2.86 1.825 C 2.582 1.847 2.466 1.887 2.401 1.92 C 2.194 2.026 2.025 2.194 1.92 2.401 C 1.886 2.467 1.847 2.582 1.824 2.86 C 1.801 3.148 1.8 3.525 1.8 4.1 L 1.8 15.7 C 1.8 16.275 1.801 16.652 1.824 16.941 C 1.847 17.219 1.886 17.334 1.92 17.4 C 2.025 17.607 2.194 17.775 2.401 17.881 C 2.466 17.914 2.582 17.953 2.86 17.976 C 3.148 18 3.525 18 4.1 18 L 12.2 18 C 12.775 18 13.152 18 13.44 17.976 C 13.718 17.953 13.833 17.914 13.899 17.881 C 14.106 17.775 14.275 17.607 14.38 17.4 C 14.414 17.334 14.453 17.219 14.476 16.941 C 14.499 16.652 14.5 16.275 14.5 15.7 L 14.5 7.8 L 11.221 7.8 C 10.966 7.8 10.724 7.8 10.52 7.783 C 10.298 7.765 10.043 7.723 9.788 7.593 C 9.43 7.411 9.14 7.12 8.957 6.763 C 8.828 6.508 8.785 6.253 8.767 6.03 C 8.75 5.826 8.75 5.584 8.75 5.33 L 8.75 1.8 Z M 13.227 6 L 10.55 3.323 L 10.55 5.9 C 10.55 5.955 10.595 6 10.65 6 L 13.227 6 Z" fill="currentColor" fill-rule="evenodd"/>'],
  // generic image-frame glyph (hand-drawn, neutral placeholder use)
  image: ['0 0 24 24', '<rect x="2" y="3.5" width="20" height="17" rx="3.2" stroke="currentColor" stroke-width="1.7" fill="none"/><circle cx="8.2" cy="9.4" r="1.9" fill="currentColor"/><path d="M3 18l5.2-5 3.6 3.4 3.4-3.2 5.6 5.4" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'],
};

function Icon({ name, size = 20, color, style = {} }) {
  const def = ICONS[name] || ICONS.image;
  return (
    <svg
      aria-hidden="true"
      width={size} height={size} viewBox={def[0]}
      style={{ display: 'inline-block', flex: '0 0 auto', color: color || undefined, ...style }}
      dangerouslySetInnerHTML={{ __html: def[1] }}
    />
  );
}

// Inline chevron / plus / dot (not in the icon set — drawn directly)
function Chevron({ dir = 'down', size = 16, color = 'currentColor', width = 1.8 }) {
  const d = {
    down: 'M3 6l5 5 5-5',
    up: 'M3 10l5-5 5 5',
    right: 'M6 3l5 5-5 5',
    left: 'M10 3L5 8l5 5',
  }[dir];
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none"
      style={{ flex: '0 0 auto' }}>
      <path d={d} stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Plus({ size = 16, color = 'currentColor', width = 1.9 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flex: '0 0 auto' }}>
      <path d="M8 2.5v11M2.5 8h11" stroke={color} strokeWidth={width} strokeLinecap="round" />
    </svg>
  );
}
function Dot() {
  return <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--color-text-neutral-assistive)', flex: '0 0 auto' }} />;
}

// ── Brand mark + wordmark ────────────────────────────────────────────
function Mark({ size = 32, radius = 9 }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: radius,
      background: 'var(--color-primary-normal)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flex: '0 0 auto',
    }}>
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
        {/* steam */}
        <path d="M9 3.2c1.3 1.1 1.3 2 0 3.1s-1.3 2 0 3.1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        <path d="M14.5 2.4c1.3 1.1 1.3 2 0 3.1s-1.3 2 0 3.1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        {/* bowl */}
        <path d="M3 12h18c0 4.4-3.2 7.7-7.4 8.4a8.7 8.7 0 0 1-3.2 0C6.2 19.7 3 16.4 3 12Z" fill="#fff" />
      </svg>
    </span>
  );
}
function Wordmark({ size = 21 }) {
  return (
    <span style={{
      fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: size,
      letterSpacing: '-0.03em', lineHeight: 1, whiteSpace: 'nowrap',
    }}>
      <span style={{ color: 'var(--color-text-neutral-primary)' }}>Recipe</span>
      <span style={{ color: 'var(--color-primary-normal)' }}>Hub</span>
    </span>
  );
}
function Logo({ markSize = 30, wordSize = 21, gap = 9 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap }}>
      <Mark size={markSize} radius={Math.round(markSize * 0.28)} />
      <Wordmark size={wordSize} />
    </span>
  );
}

// ── Avatar (initial on a tinted disc) ────────────────────────────────
const AVA_TINTS = [
  ['#FEDBC6', '#CC4B00'], ['#C9DEFE', '#0054D1'], ['#ACFCC7', '#006E25'],
  ['#FED5D5', '#B20C0C'], ['#DBD3FE', '#3A16C9'], ['#FEE6C6', '#9C5800'],
  ['#A1E1FF', '#006796'], ['#F2D6FF', '#861CB8'],
];
function avaTint(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVA_TINTS[h % AVA_TINTS.length];
}
function Avatar({ name = '익명', size = 36, ring = false }) {
  const [bg, fg] = avaTint(name);
  return (
    <span style={{
      width: size, height: size, borderRadius: '50%', background: bg, color: fg,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: size * 0.42,
      flex: '0 0 auto', userSelect: 'none',
      boxShadow: ring ? '0 0 0 2px #fff, 0 0 0 3px var(--color-line-normal-normal)' : 'none',
    }}>{name.slice(0, 1)}</span>
  );
}

// ── Tag chip ─────────────────────────────────────────────────────────
function Tag({ children, active = false, size = 'md' }) {
  const pad = size === 'sm' ? '5px 10px' : '7px 13px';
  const fs = size === 'sm' ? 12.5 : 13.5;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      padding: pad, borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: fs,
      letterSpacing: '0.01em', whiteSpace: 'nowrap',
      background: active ? 'var(--color-primary-normal)' : 'var(--color-background-neutral-tertiary)',
      color: active ? '#fff' : 'var(--color-text-neutral-secondary)',
    }}>
      <span style={{ opacity: active ? 0.8 : 0.55, fontWeight: 700 }}>#</span>{children}
    </span>
  );
}

// ── Button ───────────────────────────────────────────────────────────
function Btn({ children, variant = 'primary', size = 'md', icon, full = false, style = {} }) {
  const H = { sm: 34, md: 40, lg: 48 }[size];
  const FS = { sm: 13.5, md: 15, lg: 16 }[size];
  const PAD = { sm: '0 12px', md: '0 16px', lg: '0 22px' }[size];
  const variants = {
    primary: { background: 'var(--color-primary-normal)', color: '#fff', border: 'none' },
    secondary: { background: '#fff', color: 'var(--color-text-neutral-primary)', border: '1px solid var(--color-line-normal-normal)' },
    ghost: { background: 'transparent', color: 'var(--color-text-neutral-secondary)', border: 'none' },
    tinted: { background: 'var(--color-background-primary-low)', color: 'var(--color-primary-strong)', border: 'none' },
  };
  return (
    <button style={{
      height: H, padding: PAD, borderRadius: 'var(--radius-md)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
      fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: FS, letterSpacing: '0.005em',
      cursor: 'pointer', width: full ? '100%' : 'auto', whiteSpace: 'nowrap',
      ...variants[variant], ...style,
    }}>
      {icon && <Icon name={icon} size={FS + 3} />}
      {children}
    </button>
  );
}

// ── Icon button (square, hover wash baked subtle) ────────────────────
function IconBtn({ name, size = 20, badge = false, color = 'var(--color-fill-neutral-strong)' }) {
  return (
    <button style={{
      width: 40, height: 40, borderRadius: 'var(--radius-md)', border: 'none',
      background: 'transparent', cursor: 'pointer', position: 'relative',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color,
    }}>
      <Icon name={name} size={size} />
      {badge && <span style={{
        position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: '50%',
        background: 'var(--color-status-negative)', boxShadow: '0 0 0 2px #fff',
      }} />}
    </button>
  );
}

// ── Food image placeholder (warm two-tone tile) ──────────────────────
const FOOD_TINTS = [
  ['#FEEEE5', '#FEDBC6', '#FF7B2E'], // coral
  ['#FEF4E6', '#FEE6C6', '#FF9200'], // yellow
  ['#E6FFD4', '#CCFCA9', '#48AD00'], // lime
  ['#E5F6FE', '#C4ECFE', '#008DCF'], // sky
  ['#FEECFB', '#FED3F7', '#D331B8'], // pink
  ['#D9FFE6', '#ACFCC7', '#009632'], // green
  ['#F0ECFE', '#DBD3FE', '#5B37ED'], // violet
];
function foodTint(seed) {
  let h = 0; const s = String(seed);
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return FOOD_TINTS[h % FOOD_TINTS.length];
}
function FoodImg({ seed = 'r', radius = 0, height, ratio = '4 / 3', label, iconSize = 30, style = {} }) {
  const [a, b, accent] = foodTint(seed);
  return (
    <div style={{
      width: '100%', height, aspectRatio: height ? undefined : ratio, borderRadius: radius,
      background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
      position: 'relative', overflow: 'hidden', flex: '0 0 auto', ...style,
    }}>
      {/* faint utensil/plate motif */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="image" size={iconSize} color={accent} style={{ opacity: 0.32 }} />
      </div>
      {label && (
        <div style={{
          position: 'absolute', bottom: 10, left: 12,
          fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11,
          letterSpacing: '0.03em', color: accent, opacity: 0.7,
        }}>{label}</div>
      )}
    </div>
  );
}

// ── Recipe meta line (time · difficulty) ─────────────────────────────
function Meta({ time, level, color = 'var(--color-text-neutral-tertiary)', gap = 8 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap, color, fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 13 }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <Icon name="clock" size={14} />{time}
      </span>
      {level && <><Dot /><span>{level}</span></>}
    </span>
  );
}

// ── Top navigation (shared across screens) ───────────────────────────
function TopNav({ active = 'home', user = '나' }) {
  const link = (label, key) => (
    <span style={{
      height: 64, display: 'inline-flex', alignItems: 'center',
      fontFamily: 'var(--font-sans)', fontWeight: active === key ? 700 : 500, fontSize: 15,
      color: active === key ? 'var(--color-text-neutral-primary)' : 'var(--color-text-neutral-tertiary)',
      cursor: 'pointer', position: 'relative',
    }}>
      {label}
      {active === key && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2.5, background: 'var(--color-primary-normal)', borderRadius: 2 }} />}
    </span>
  );
  return (
    <header style={{
      height: 64, flex: '0 0 auto', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--color-line-normal-normal)',
      display: 'flex', alignItems: 'center', gap: 28, padding: '0 40px',
      position: 'sticky', top: 0, zIndex: 20,
    }}>
      <Logo markSize={30} wordSize={20} />
      <nav style={{ display: 'flex', alignItems: 'center', gap: 24, marginLeft: 12 }}>
        {link('홈', 'home')}
        {link('탐색', 'recipes')}
        {link('피드', 'feed')}
      </nav>
      <div style={{ flex: 1 }} />
      {/* search pill */}
      <div style={{
        width: 260, height: 40, borderRadius: 'var(--radius-full)',
        background: 'var(--color-background-neutral-secondary)',
        border: '1px solid transparent',
        display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px',
        color: 'var(--color-text-neutral-tertiary)',
      }}>
        <Icon name="search" size={16} />
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 14 }}>레시피, 재료, 태그 검색</span>
      </div>
      <Btn variant="primary" icon="write" size="md">글쓰기</Btn>
      <IconBtn name="bell" size={20} badge />
      <Avatar name={user} size={36} />
    </header>
  );
}

// ── Page shell (gray bg + nav + centered content) ────────────────────
function Page({ active, user, children, bg = 'var(--color-background-neutral-secondary)', maxWidth = 1180, pad = '36px 40px 64px' }) {
  return (
    <div style={{
      width: '100%', minHeight: '100%', background: bg,
      fontFamily: 'var(--font-sans)', color: 'var(--color-text-neutral-primary)',
      display: 'flex', flexDirection: 'column',
    }}>
      <TopNav active={active} user={user} />
      <main style={{ width: '100%', maxWidth, margin: '0 auto', padding: pad, boxSizing: 'border-box' }}>
        {children}
      </main>
    </div>
  );
}

// ── Recipe card ──────────────────────────────────────────────────────
function RecipeCard({ r, w }) {
  return (
    <div style={{
      width: w, background: '#fff', borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--color-line-normal-normal)', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <FoodImg seed={r.title} ratio="16 / 10" />
      <div style={{ padding: '16px 17px 17px', display: 'flex', flexDirection: 'column', gap: 11 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {r.tags.slice(0, 2).map((t) => <Tag key={t} size="sm">{t}</Tag>)}
        </div>
        <h3 style={{
          margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 17.5,
          letterSpacing: '-0.01em', lineHeight: 1.35, color: 'var(--color-text-neutral-primary)',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{r.title}</h3>
        <p style={{
          margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 13.5, lineHeight: 1.55,
          color: 'var(--color-text-neutral-tertiary)',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{r.desc}</p>
        <div style={{ height: 1, background: 'var(--color-line-solid-neutral)', margin: '3px 0 0' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar name={r.author} size={24} />
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13, color: 'var(--color-text-neutral-secondary)' }}>{r.author}</span>
          </div>
          <Meta time={r.time} level={r.level} />
        </div>
      </div>
    </div>
  );
}

// ── Mock data ────────────────────────────────────────────────────────
const RECIPES = [
  { title: '들기름 막국수', author: '김민지', time: '15분', level: '쉬움', tags: ['면요리', '여름', '비건'], desc: '고소한 들기름과 새콤한 양념장만으로 완성하는 초간단 비빔 막국수. 입맛 없는 날 후루룩.' },
  { title: '토마토 빠네 파스타', author: '이서준', time: '30분', level: '보통', tags: ['파스타', '브런치'], desc: '속을 파낸 빵 그릇에 담아내는 토마토 크림 파스타. 주말 브런치로 손색없는 비주얼.' },
  { title: '매콤 닭볶음탕', author: '박지우', time: '50분', level: '보통', tags: ['한식', '매운맛'], desc: '감자와 닭을 큼직하게, 칼칼한 국물까지. 밥 두 공기 부르는 집밥 메뉴.' },
  { title: '바질 페스토 뇨끼', author: '정하윤', time: '25분', level: '보통', tags: ['파스타', '이탈리안'], desc: '쫄깃한 감자 뇨끼에 직접 간 바질 페스토를 듬뿍. 향이 살아있는 한 접시.' },
  { title: '초당옥수수 리조또', author: '최우진', time: '35분', level: '보통', tags: ['리조또', '제철'], desc: '여름 한정 초당옥수수의 단맛을 그대로. 치즈와 만나 부드럽게 졸인 리조또.' },
  { title: '두부 김치', author: '강도윤', time: '20분', level: '쉬움', tags: ['한식', '자취요리'], desc: '잘 익은 김치를 들기름에 볶고 따뜻한 두부 한 모. 자취생의 든든한 한 끼.' },
  { title: '흑임자 라떼', author: '윤지호', time: '10분', level: '쉬움', tags: ['음료', '카페'], desc: '집에서 만드는 카페 시그니처. 고소한 흑임자와 우유의 황금 비율.' },
  { title: '페퍼로니 감바스', author: '임채원', time: '20분', level: '쉬움', tags: ['안주', '와인'], desc: '올리브유에 마늘과 새우를 보글보글. 바게트를 적셔 먹는 와인 안주.' },
  { title: '단호박 크림수프', author: '한소희', time: '30분', level: '쉬움', tags: ['수프', '건강식'], desc: '단호박을 푹 익혀 곱게 갈아낸 자연 단맛 가득 크림수프. 속이 편안한 한 그릇.' },
];

const FILTER_TAGS = ['전체', '한식', '파스타', '베이킹', '비건', '자취요리', '안주', '음료', '디저트', '브런치'];

const POPULAR_TAGS = [
  ['자취요리', 1240], ['한식', 980], ['파스타', 870], ['비건', 760], ['베이킹', 690],
  ['에어프라이어', 540], ['다이어트', 510], ['안주', 470], ['디저트', 430], ['브런치', 360],
];

Object.assign(window, {
  Icon, Chevron, Plus, Dot, Mark, Wordmark, Logo, Avatar, Tag, Btn, IconBtn,
  FoodImg, Meta, TopNav, Page, RecipeCard,
  RECIPES, FILTER_TAGS, POPULAR_TAGS, foodTint, avaTint,
});
