import CourseCategoriesChart from "@/features/categories/components/CourseCategoriesChart";
import RevenueChart from "./RevenueChart";
import UserGrowthChart from "./UserGrowthChart";
import EnrollmentsChart from "./EnrollmentsChart";
import TopInstructorsChart from "./TopInstructorsChart";

const AnalyticsCharts = ({
  monthlyRevenue,
  monthlyStudents,
  monthlyInstructors,
  topInstructors,
  courseCategories,
  newEnrollments,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg text-text-1">
          Analytics &amp; Reports
        </h3>
        <div className="font-mono text-[11px] text-text-3 border border-border rounded-full px-2.5 py-1">
          Last 6 months
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-[18px] mb-[18px]">
        <RevenueChart data={monthlyRevenue} />
        <UserGrowthChart
          monthlyStudents={monthlyStudents}
          monthlyInstructors={monthlyInstructors}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[18px]">
        <CourseCategoriesChart courseCategories={courseCategories} />
        <EnrollmentsChart newEnrollments={newEnrollments} />
        <TopInstructorsChart data={topInstructors} />
      </div>
    </div>
  );
};

export default AnalyticsCharts;
