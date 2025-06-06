import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageHeader from '../components/Dashboard/PageHeader';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import SalesForecastChart from '../components/Dashboard/SalesForecastChart';
import DealTypeChart from '../components/Dashboard/DealTypeChart';
import BalanceOverviewChart from '../components/Dashboard/BalanceOverviewChart';
import DealsStatusTable from '../components/Dashboard/DealsStatusTable';
import MyTasksCard from '../components/Dashboard/MyTasksCard';

// Define breadcrumbs data matching the PageHeader component's expected prop type
const breadcrumbs: { label: string; href?: string }[] = [
  { label: 'Dashboards', href: '#' },
  { label: 'CRM' },
];

const CrmDashboardPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* Page Header: Title and Breadcrumbs */}
      <PageHeader title="CRM" breadcrumbs={breadcrumbs} />

      {/* Statistics Cards Grid */}
      <div className="mt-6">
        <StatsCardGrid />
      </div>

      {/* Main Content Grid: Charts, Tables, Tasks */}
      {/* This grid implements the 'mainContent.container' layout: 'grid grid-cols-2 gap-6' for larger screens */}
      {/* On smaller screens (default), it's a single column (grid-cols-1), causing items to stack. */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <SalesForecastChart />
          <DealsStatusTable />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <DealTypeChart />
          <BalanceOverviewChart />
          <MyTasksCard />
        </div>
      </div>
    </MainAppLayout>
  );
};

export default CrmDashboardPage;
