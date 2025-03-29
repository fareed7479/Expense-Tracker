import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);

    console.log("User in DashboardLayout:", user);
    console.log("Children in DashboardLayout:", children);

    return (
        <div className="">
            <Navbar activeMenu={activeMenu} />

            <div className="flex">
                {/* Sidebar - Fix Hidden Issue */}
                <div className="hidden lg:block">
                    <SideMenu activeMenu={activeMenu} />
                </div>

                {/* Main Content */}
                <div className="grow mx-5">{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
