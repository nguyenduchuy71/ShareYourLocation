import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

function CustomInput({ id, type, setValue, defaultValue }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        onChange={(e) => setValue(e.target.value)}
        id={id}
        type={showPassword ? "text" : type}
        placeholder={defaultValue}
      />
      {type === "password" && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-2 -translate-y-1/2"
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </Button>
      )}
    </div>
  );
}

export default CustomInput;
