import { fetchWithAuth } from '@/lib/fetchWraper';
import Navbar from './Navbar';
import { INotification } from '@/types';
import { getCurrentUser } from '@/services/AuthService';
import TagTypes from '@/helpers/config/TagTypes';

const NavbarWraper = async () => {
    const userData = await getCurrentUser();
    let notifications: INotification[] = [];

    if (userData) {
        // Runs on every page (root layout), so it must never log the user out.
        const res = await fetchWithAuth(
            `/notifications/my-notifications?page=1&limit=6`,
            {
                next: {
                    tags: [TagTypes.notification],
                },
            },
            { logoutOnAuthFailure: false }
        );
        if (res.ok) {
            const data = await res.json();
            notifications = data?.data?.notifications || [];
        }
    }
    console.log(notifications)
    return (
        <div>
            <Navbar notifications={notifications} />
        </div>
    );
};

export default NavbarWraper;