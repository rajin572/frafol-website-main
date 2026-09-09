import FrafolChoiceSection from '@/components/Dashboard/Professional/FrafolChoice/FrafolChoiceSection';
import TagTypes from '@/helpers/config/TagTypes';
import { fetchWithAuth } from '@/lib/fetchWraper';
import { IProfile } from '@/types';

export interface ISubscriptionData {
    hasActiveSubscription: boolean,
    subscriptionExpiryDate: string,
    subscriptionDays: number
}

export interface ISubscription {
    _id: string;
    title: string;
    duration: number;
    price: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const page = async () => {
    const [subRes, packRes, profileRes] = await Promise.all([
        fetchWithAuth(`/users/me/subscription`, { next: { tags: [TagTypes.subscriptionOrder] } }),
        fetchWithAuth(`/subscription`, { next: { tags: [TagTypes.subscriptionOrder] } }),
        fetchWithAuth(`/users/my-profile`, { next: { tags: [TagTypes.profile] } }),
    ]);

    const subscriptionData: ISubscriptionData = (await subRes.json())?.data;
    const allPacks: ISubscription[] = (await packRes.json())?.data;
    const myData: IProfile = (await profileRes.json())?.data;

    return (
        <div>
            <FrafolChoiceSection subscriptionData={subscriptionData} allPacks={allPacks} myData={myData} />
        </div>
    );
};

export default page;