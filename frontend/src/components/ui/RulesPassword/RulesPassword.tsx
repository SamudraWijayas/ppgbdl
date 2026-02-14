import React from "react";
interface RuleItemProps {
  valid: boolean;
  label: string;
}

const RulesPassword = (props: RuleItemProps) => {
  const { valid, label } = props;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={valid ? "text-green-600" : "text-red-500"}>
        {valid ? "✓" : "✕"}
      </span>
      <span className={valid ? "text-green-600" : "text-gray-500"}>
        {label}
      </span>
    </div>
  );
};

export default RulesPassword;
