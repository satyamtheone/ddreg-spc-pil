"use client";

type TabItem = {
  label: string;
  value: string;
};

type Props = {
  tabs?: TabItem[];
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const DynamicTab = ({
  tabs = [],
  setActiveTab,
  activeTab,
}: Props) => {
  return (
    <div className="spcBNS rounded-[35px] max-w-max animate-dialog-slide-down bg-purple-50  p-2">
      <div className=" flex gap-2">
        {tabs.map((t) => (
          <div
            key={t.value}
            onClick={() => setActiveTab(t.value)}
            className={` custom-dynmicButton-hover-classes cursor-pointer rounded-[35px] py-2 flex items-center justify-center 
              md:text-base text-sm px-8 max-md:min-w-max 
              h-full ${
                activeTab === t.value
                  ? "bg-gradient"
                  : "text-black hover:bg-teal-500 hover:text-white"
              }`}
          >
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicTab;