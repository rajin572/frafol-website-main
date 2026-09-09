import React from "react";
import SectionHeader from "../ui/SectionHeader";
import ProfessionalReviewRating from "./ProfessionalReviewRating";
import ProfessionalReviewsFiltre from "./ProfessionalReviewsFiltre";
import ReviewCard from "./ProfessionalReviewCard";
import { IProfessionalUser, IReview } from "@/types";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";

const ProfessionalReviews = async ({
  professionalUser,
  sort,
  rating,
}: {
  professionalUser: IProfessionalUser;
  sort: string;
  rating: string;
}) => {
  const res = await fetchWithAuth(
    `/review/service-provider/${professionalUser?._id}?sort=${sort}&rating=${rating}`,
    {
      next: {
        tags: [TagTypes.prfessional],
      },
    }
  );
  const data = await res.json();
  const reviews: IReview[] = data?.data?.reviews || [];

  console.log("Review View:", data?.data?.reviews)
  return (
    <div id="reviews" className="mt-16">
      <SectionHeader title="Reviews" className="mb-3" />
      <ProfessionalReviewRating professionalUser={professionalUser} />
      <ProfessionalReviewsFiltre />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-10">
        {reviews.map((review, idx) => (
          <ReviewCard key={idx} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ProfessionalReviews;
