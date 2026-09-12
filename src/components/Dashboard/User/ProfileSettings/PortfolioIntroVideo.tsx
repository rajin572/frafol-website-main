import ReuseButton from '@/components/ui/Button/ReuseButton';
import ProfileProtfolioUploadImageModal from '@/components/ui/Modal/Profile/ProfileProtfolioUploadImageModal';
import { IProfile } from '@/types';
import React, { useState } from 'react';
import GalleryVideoPlayer from '@/components/shared/GalleryVideoPlayer';
import useVideoThumbnails from '@/hook/useVideoThumbnails';

const PortfolioIntroVideo = ({ myData }: { myData: IProfile }) => {
    const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
    const videoThumbnails = useVideoThumbnails([myData?.introVideo]);

    const showUploadModal = () => {
        setIsUploadModalVisible(true);
    };

    const handleCancel = () => {
        setIsUploadModalVisible(false);
    };

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

                {myData?.introVideo && (
                    <GalleryVideoPlayer
                        src={myData.introVideo}
                        poster={videoThumbnails[myData.introVideo]}
                        wrapperClassName="max-w-[768px] aspect-video bg-gray-200 rounded-lg"
                    />
                )}

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