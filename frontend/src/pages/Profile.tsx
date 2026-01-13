import ProfileInfo from "../components/ProfileInfo";
const Profile = () => {
    return (
        <div className="overflow-hidden">
            <div className="w-full">
                <ProfileInfo />
            </div>
            {/* <div className="hidden md:block flex-1 overflow-y-auto bg-neutral-900/50 border-l border-neutral-800" flex h-[calc(100vh-70px)]>
            </div> */}
        </div>
    );
};

export default Profile;