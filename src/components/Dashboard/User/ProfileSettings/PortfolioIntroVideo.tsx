import ReuseButton from '@/components/ui/Button/ReuseButton';
import ProfileProtfolioUploadImageModal from '@/components/ui/Modal/Profile/ProfileProtfolioUploadImageModal';
import { getServerUrl } from '@/helpers/config/envConfig';
import { IProfile } from '@/types';
import React, { useState } from 'react';

const PortfolioIntroVideo = ({ myData }: { myData: IProfile }) => {
    const serverUrl = getServerUrl();
    const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);

    const showUploadModal = () => {
        setIsUploadModalVisible(true);
    };

    const handleCancel = () => {
        setIsUploadModalVisible(false);
    };


    console.log(serverUrl + myData?.introVideo)
    return (
        <div>
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-1.5">Intro Video</h2>
                    <p className="text-sm sm:text-base lg:text-lg text-base-color/80 font-medium">A short intro that explains your style and services.</p>
                </div>
                <ReuseButton
                    variant="secondary"
                    className="!w-fit"
                    onClick={showUploadModal}
                >
                    Upload New Video
                </ReuseButton>
            </div>
            <div>

                {myData?.introVideo && <div className="relative group w-full ">
                    <video
                        src={`${serverUrl}${myData?.introVideo}`}
                        className="w-full max-w-[768px] aspect-video object-cover rounded-lg"
                        controls
                        controlsList="nodownload noplaybackrate"
                    />
                </div>}

            </div>

            <ProfileProtfolioUploadImageModal
                isModalVisible={isUploadModalVisible}
                handleCancel={handleCancel}
                type="video"
            />
        </div>
    );
};

export default PortfolioIntroVideo;