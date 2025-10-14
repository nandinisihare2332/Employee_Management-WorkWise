import React from "react";
import { FaFileAlt, FaBookOpen, FaQuestionCircle, FaHeadset } from "react-icons/fa";

const resources = [
  {
    title: "Company Policies",
    description:
      "Access updated HR, leave, and attendance policies. Stay informed about workplace ethics and compliance.",
    icon: <FaFileAlt className="text-3xl text-green-400" />,
    link: "/policies",
  },
  {
    title: "User Guides",
    description:
      "Step-by-step tutorials on how to add employees, manage attendance, and generate performance reports.",
    icon: <FaBookOpen className="text-3xl text-green-400" />,
    link: "/guides",
  },
  {
    title: "FAQs",
    description:
      "Find answers to the most common questions about using the WorkWise platform and its key features.",
    icon: <FaQuestionCircle className="text-3xl text-green-400" />,
    link: "/faq",
  },
  {
    title: "Support",
    description:
      "Need help? Contact our HR or technical support team for any queries or issues you face.",
    icon: <FaHeadset className="text-3xl text-green-400" />,
    link: "/support",
  },
];

const Resources = () => {
  return (
    <div className="flex flex-col bg-slate-100 min-h-screen p-6 sm:p-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        Resources <span className="text-green-500">Center</span>
      </h1>
      <p className="text-slate-600 mb-10 max-w-2xl">
        Explore essential company resources to help you stay updated, informed, and productive.
      </p>

      {/* Grid layout for resource cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {resources.map((item) => (
          <div
            key={item.title}
            className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="mb-4">{item.icon}</div>
              <h2 className="text-lg font-semibold text-slate-800 mb-2">
                {item.title}
              </h2>
              <p className="text-slate-600 text-sm mb-4">{item.description}</p>
            </div>
            <a
              href={item.link}
              className="text-green-500 font-medium text-sm hover:text-green-600"
            >
              Learn more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
