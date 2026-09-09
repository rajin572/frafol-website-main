import { Modal, Rate } from "antd";
import { AllImages } from "../../../../../public/assets/AllImages";
import Image from "next/image";
import { IProfessionalReview } from "@/types";
import { getServerUrl } from "@/helpers/config/envConfig";
import { formatDate } from "@/utils/dateFormet";

const ReportViewModal = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}: {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IProfessionalReview | null;
}) => {
  if (!currentRecord) return null;
  const serverUrl = getServerUrl();

  const { userId, rating, message, createdAt } = currentRecord;
  const userName = userId?.name || "Unknown User";
  const userEmail = userId?.email || "No Email";
  const userProfile =
    serverUrl + userId?.profileImage || AllImages.dummyProfile;

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="p-5">
        <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-color text-center">
          User Feedback
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-center mt-2">
          See full feedback from {userName}
        </p>

        <div className="flex justify-center items-center gap-2 mt-5">
          <Image
            src={userProfile}
            alt={userName}
            className="w-12 h-12 object-cover rounded-full"
            width={48}
            height={48}
          />
          <div className="text-base sm:text-lg lg:text-xl font-semibold">
            {userName}
          </div>
        </div>

        <div className="mt-8">
          <div className="text-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">Name:</span>
              <span className="text-secondary-color">{userName}</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{/* Email: */}E-mail:</span>
              <span>{userEmail}</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{/* Rating: */}Hodnotenie:</span>
              <Rate
                disabled
                value={rating}
                allowHalf
                className="text-secondary-color"
              />
              <span className="ml-2">{rating}</span>
            </div>

            <div className="flex items-start gap-2 mb-2">
              <span className="font-medium text-nowrap">{/* Feedback: */}Recenzia:</span>
              <span className="text-justify pt-0">
                {message || "No feedback provided."}
              </span>
            </div>

            <div className="flex items-start gap-2 mb-2">
              <span className="font-medium text-nowrap">{/* Date: */}Dátum:</span>
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReportViewModal;
