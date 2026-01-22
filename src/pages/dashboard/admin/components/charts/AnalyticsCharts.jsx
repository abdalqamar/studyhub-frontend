import RevenueChart from "./RevenueChart";
import UserGrowthChart from "./UserGrowthChart";
import CourseCategoriesChart from "./CourseCategoriesChart";
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
      <h2 className="text-2xl font-bold text-white mb-6">
        Analytics & Reports
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RevenueChart data={monthlyRevenue} />
        <UserGrowthChart
          monthlyStudents={monthlyStudents}
          monthlyInstructors={monthlyInstructors}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <CourseCategoriesChart courseCategories={courseCategories} />
        <EnrollmentsChart newEnrollments={newEnrollments} />
        <TopInstructorsChart data={topInstructors} />
      </div>
    </div>
  );
};

export default AnalyticsCharts;
