import {AriaAttributes, ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react';

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, AriaAttributes  {
  typeButton?: 'basic' | 'outline';
}

const defaultBtnClass = 'px-4 py-2 outline-none rounded font-medium active:scale-95 hover:bg-primary-dark hover:text-white focus:ring-2 focus:ring-primary-dark focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200';

const basicBtnClass = 'bg-primary text-white';
const outlineBtnClass = 'bg-transparent border-2 border-primary-light dark:hover:border-primary-dark text-primary dark:text-primary-light dark:hover:text-white';

const Button:FC<ButtonProps> = (
  {
    children,
    className,
    typeButton,
    ...rest
  }) => {

  return (
    <button
      className={`${defaultBtnClass} ${typeButton === 'basic' || !typeButton ?
        basicBtnClass : outlineBtnClass } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );

};

export default Button;
