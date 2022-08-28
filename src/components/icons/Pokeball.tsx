export const Pokeball = ({className = ''}) =>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" className={`${className} fill-red-500 stroke-black dark:stroke-gray-700`}>
    <path d="M 2 22	a 1 1 1 0 1 40 0	h-12.5 a 1 1 1 0 0 -15 0 z"/>
    <circle cx="22" cy="22" r="7" fill="white" stroke="#222"/>
    <circle cx="22" cy="22" r="3" fill="#c4c2cc" stroke="#222"/>
    <path d="M 2 22 a 1 1 1 0 0 40 0 h-12.5 a 1 1 1 0 1 -15 0 z" fill="#fff"/>
  </svg>;
