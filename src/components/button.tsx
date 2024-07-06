interface ButtonProps {
  text: string;
  styles?: string;
}

const Button: React.FC<ButtonProps> = ({ text, styles }) => {
  return (
    <button
      className={`${styles}   inline-block bg-primary text-white font-bold font-poppins px-6 py-3 rounded-full w-full hover:bg-secondary transition-colors duration-300`}
    >
      {text}
    </button>
  );
};

export default Button;
