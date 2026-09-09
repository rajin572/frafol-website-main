import React from 'react';
import { AllImages } from '../../../../../public/assets/AllImages';
import PricingCard, { IPricingPlan } from './PricingCard';
import { ISubscription, ISubscriptionData } from '@/app/(withDashboardLayout)/dashboard/professional/frafol-choice/page';
import { FaRegCircleCheck } from 'react-icons/fa6';
import Image from 'next/image';
import { IProfile } from '@/types';

const FrafolChoiceSection = ({ subscriptionData, allPacks, myData }: { subscriptionData: ISubscriptionData, allPacks: ISubscription[], myData: IProfile }) => {
    const features = [
        {
            text: <span
                className="text-base leading-relaxed"

            >
                {/* Profile visibility on the Frafol homepage */}
                Viditeľnosť profilu na domovskej stránke Frafol
            </span>,
            included: true
        },
        {
            text: <span
                className="text-base leading-relaxed"

            >
                {/* Higher placement in client search results */}
                Vyššie umiestnenie vo výsledkoch vyhľadávania klientov
            </span>,
            included: true
        },
        {
            text: <div className='flex items-center gap-2'> <span
                className="text-base leading-relaxed"

            >
                {/* Badge */}
                Odznak
            </span><div className="flex items-center gap-1 bg-secondary-color px-2 py-1 rounded-full z-20 shadow-md">
                    <Image
                        src={AllImages?.batch}
                        width={16}
                        height={16}
                        alt="Frafol Choice Badge"
                        className="size-2.5 sm:size-3 lg:size-4"
                    />
                    <p className="text-white text-[8px] sm: lg:text-sm font-bold">
                        {/* Frafol Choice */}
                        Odporúča Frafol
                    </p>
                </div></div>, included: true
        },
        {
            text: <span
                className="text-base leading-relaxed"
            >
                {/* Priority visibility compared to standard profiles */}
                Prednostná viditeľnosť v porovnaní so štandardnými profilmi
            </span>, included: true
        },

    ]
    const pricingPlans: IPricingPlan[] = [
        {
            id: 1 * 30,
            /* name: "Frafol Choice", */
            name: "Odporúča Frafol",
            price: 15,
            period: 1,
            icon: AllImages?.batch,
            /* description: "Short-term profile highlighting." */
            description: "Krátkodobé zvýraznenie profilu."
        },
        {
            id: 3 * 30,
            /* name: "Frafol Choice", */
            name: "Odporúča Frafol",
            price: 45,
            period: 3,
            icon: AllImages?.batch,
            /* description: "More stable profile visibility over a longer period." */
            description: "Stabilnejšia viditeľnosť profilu počas dlhšieho obdobia."
        },
        {
            id: 6 * 30,
            /* name: "Frafol Choice", */
            name: "Odporúča Frafol",
            price: 90,
            period: 6,
            icon: AllImages?.batch,
            popular: true,
            /* badge: "Best Value", */
            badge: "Najvýhodnejšia ponuka",
            /* description: "Long-term visibility with the best monthly price." */
            description: "Dlhodobá viditeľnosť za najlepšú mesačnú cenu."
        },
        {
            id: 365,
            /* name: "Frafol Choice", */
            name: "Odporúča Frafol",
            price: 180,
            period: 12,
            icon: AllImages?.batch,
            /* description: "Full-year profile highlighting without interruptions." */
            description: "Celoročné zvýraznenie profilu bez prerušenia."
        },
    ];

    console.log(pricingPlans)
    return (
        <div>
            <div className="mt-2">
                {/* <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-color">
                    Frafol Choice
                </h2> */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-color">
                    Odporúča Frafol
                </h2>
                {/* <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-3">
                    Profile Highlighting for Higher Visibility
                </h4> */}
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-3">
                    Zvýraznenie profilu pre vyššiu viditeľnosť
                </h4>
                {/* <p className="text-sm sm:text-base lg:text-lg mt-4 text-base-color/80">
                    Frafol Boost is a paid profile highlighting feature that makes your profile more visible to clients on the Frafol platform.
                </p> */}
                <p className="text-sm sm:text-base lg:text-lg mt-4 text-base-color/80">
                    Odporúča Frafol je platená funkcia zvýraznenia profilu, vďaka ktorej bude váš profil pre klientov na platforme Frafol viditeľnejší.
                </p>
            </div>
            <ul className="mt-5 flex-1 space-y-4 p-2 mb-3 rounded-lg">
                {/* <ReuseButton variant="secondary" className="cursor-pointer bg-warning! border-warning! py-2! !w-fit px-4! text-base! text-secondary-color! font-bold! shadow" disabled>Included</ReuseButton> */}
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">

                        <FaRegCircleCheck className="size-4 mt-1.5 shrink-0 text-secondary-color" />


                        {feature.text}
                    </li>
                ))}
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16 items-baseline">
                {pricingPlans.map((plan, i) => (
                    <PricingCard key={plan?.id} plan={plan} subscriptionData={subscriptionData} pack={allPacks[i]} myData={myData} />
                ))}
            </div>
        </div>
    );
};

export default FrafolChoiceSection;