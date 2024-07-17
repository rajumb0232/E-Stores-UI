import React from "react";

const Footer = () => {
  return (
    <footer className="h-max w-full pt-4 bg-gray-100 text-slate-700 text-center text-lg flex justify-center items-center">
      <div className=" w-10/12 h-full flex flex-col justify-center items-center px-10 py-4">
        <div className=" w-full flex justify-evenly items-start">
          <FooterBlock name={"Social Profiles"}>
            <FooterLink
              title={"GitHub"}
              url={"https://github.com/rajumb0232"}
            />
            <FooterLink
              title={"Hashnode"}
              url={"https://hashnode.com/@RajuGowda"}
            />
            <FooterLink
              title={"Linkedin"}
              url={"https://www.linkedin.com/in/raju-gowda-atwork"}
            />
          </FooterBlock>

          <FooterBlock name={"Application"}>
            <FooterLink
              title={"API Documentation"}
              url={"http://localhost:7000/swagger-ui.html"}
            />
            <FooterLink
              title={"Source code (GitHub Repo)"}
              url={
                "https://github.com/rajumb0232/E-Stores-Shopping-Application"
              }
            />
            <FooterLink
              title={"Postman"}
              url={
                "https://e-stores.postman.co/workspace/Team-Workspace~f285e463-d634-46c0-882f-a50b8e8e59f3/api/48bfcf95-c648-4465-92da-6b87a9480b3e?action=share&creator=36942562&active-environment=36942562-c940278d-34a3-4f8f-9b14-8a7141964326"
              }
            />
          </FooterBlock>

          <FooterBlock name={"More.."}>
            <FooterLink
              title={"Portfolio"}
              url={"https://github.com/rajumb0232"}
            />
            <FooterLink
              title={"Blogs"}
              url={"https://blogs.bitsofdevbrain.com"}
            />
            <FooterLink title={"Contact me"} url={""} />
          </FooterBlock>
        </div>
        <p className="bg-transparent text-xs mt-8">
          An advanced, secure e-commerce application built with ReactJS and
          Tailwind CSS, featuring robust backend services powered by Spring Boot
          RESTful APIs, implemented with Spring Security and JWT for
          authentication and authorization. Dive into our{" "}
          <a
            href="http://localhost:7000/swagger-ui.html"
            target="_blank"
            className="underline hover:text-blue-500"
          >
            API Documentation
          </a>{" "}
          for comprehensive details.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

export const FooterLink = ({ title, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      className="text-sm hover:text-blue-500 hover:underline py-1"
    >
      {title}
    </a>
  );
};

export const FooterBlock = ({ children, name }) => {
  return (
    <div className="text-sm flex flex-col justify-start items-start">
      <h4 className="font-bold underline">{name}</h4>
      <div className="flex flex-col justify-center items-start">{children}</div>
    </div>
  );
};
