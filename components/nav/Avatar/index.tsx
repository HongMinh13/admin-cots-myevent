import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import "./styles.css";

//
const AvatarImageUrl = "assets/images/Avatar-client.jpg";

const AvatarDemo = () => (
    <div style={{ display: "flex", gap: 20 }}>
        <Avatar.Root className="AvatarRoot">
            <Avatar.Image
                className="AvatarImage"
                src={AvatarImageUrl}
                alt="Avatar-client"
            />
            <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                CT
            </Avatar.Fallback>
        </Avatar.Root>
    </div>
);

export default AvatarDemo;
