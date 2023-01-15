const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="flex items-center justify-center h-16 text-sm text-white bg-black/50">{`© ${year} Task Board™. All Rights Reserved.`}</footer>
  );
};

export default Footer;
