import Bar_Chart from "@/components/Chart/BarChart";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import YearOption from "@/utils/YearOption";

const IncomeOverview = async ({ year }: { year: number }) => {
  const currentYear = new Date().getFullYear();

  const earningStateRes = await fetchWithAuth(
    `/users/monthly-earning-statistics?year=${year}`,
    {
      next: {
        tags: [TagTypes.earning],
      },
    }
  );

  const earningStateData = await earningStateRes.json();
  const earningState = earningStateData.data?.monthlyEarnings;

  return (
    <div className="w-full p-3 rounded-lg flex flex-col bg-primary-color">
      <div className="flex justify-between text-base-color mt-4">
        {/* <p className=" text-base-color text-lg sm:text-xl lg:text-2xl font-bold mb-5">
          Earning
        </p> */}
        <p className=" text-base-color text-lg sm:text-xl lg:text-2xl font-bold mb-5">
          Zárobky
        </p>
        <div>
          <YearOption currentYear={currentYear} />
        </div>
      </div>
      <hr />
      <div>
        <Bar_Chart data={earningState} />
      </div>
    </div>
  );
};

export default IncomeOverview;
