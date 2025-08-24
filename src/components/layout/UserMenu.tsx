import { useUser } from "@/contexts/userContext";
import { useState } from "react";

import css from "./UserMenu.module.css"

export default function UserMenu() {
    const { user, handleSignOut } = useUser();

    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <div className={css.userMenu}>
            {/* show nav on hover */}

            <button
                className={css.avatarButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                <img
                    src={user?.user_metadata?.avatar_url}
                    alt={`${user?.user_metadata?.preferred_username} avatar`} className="user-avatar"
                />
            </button>

            {isOpen && (
                <div className={css.nav}>
                    <span className="user-name">
                        {user.user_metadata.preferred_username}
                    </span>

                    <button onClick={handleSignOut}>Sign out</button>


                    <pre className="user-name">{JSON.stringify(user, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
