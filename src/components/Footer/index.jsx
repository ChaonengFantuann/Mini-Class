import { DefaultFooter } from "@ant-design/pro-layout";

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter 
      copyright={`${currentYear} 圆梦团队出品`}
    />
  );
}

export default Footer;