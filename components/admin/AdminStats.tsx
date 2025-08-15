"use client";

import { Users, UserCheck, Shield, TrendingUp } from "lucide-react";

interface AdminStatsProps {
	stats: {
		totalUsers: number;
		activeUsers: number;
		adminUsers: number;
		newThisMonth: number;
	};
}

export const AdminStats = ({ stats }: AdminStatsProps) => {
	type ChangeType = "increase" | "decrease" | "neutral";

	const statItems: {
		name: string;
		value: number;
		icon: React.ElementType;
		color: string;
		bgColor: string;
		change: string;
		changeType: ChangeType;
	}[] = [
		{
			name: "Total Users",
			value: stats.totalUsers,
			icon: Users,
			color: "text-blue-600 dark:text-blue-400",
			bgColor: "bg-blue-50 dark:bg-blue-900/20",
			change: "+12%",
			changeType: "increase",
		},
		{
			name: "Active Users",
			value: stats.activeUsers,
			icon: UserCheck,
			color: "text-green-600 dark:text-green-400",
			bgColor: "bg-green-50 dark:bg-green-900/20",
			change: "+8%",
			changeType: "increase",
		},
		{
			name: "Administrators",
			value: stats.adminUsers,
			icon: Shield,
			color: "text-purple-600 dark:text-purple-400",
			bgColor: "bg-purple-50 dark:bg-purple-900/20",
			change: "0%",
			changeType: "neutral",
		},
		{
			name: "New This Month",
			value: stats.newThisMonth,
			icon: TrendingUp,
			color: "text-orange-600 dark:text-orange-400",
			bgColor: "bg-orange-50 dark:bg-orange-900/20",
			change: "+24%",
			changeType: "increase",
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{statItems.map((stat) => {
				const Icon = stat.icon;
				return (
					<div
						key={stat.name}
						className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
					>
						<div className="flex items-center">
							<div
								className={`flex-shrink-0 ${stat.bgColor} p-3 rounded-lg`}
							>
								<Icon className={`h-6 w-6 ${stat.color}`} />
							</div>
							<div className="ml-4 flex-1">
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
									{stat.name}
								</p>
								<div className="flex items-baseline">
									<p className="text-2xl font-semibold text-gray-900 dark:text-white">
										{stat.value.toLocaleString()}
									</p>
									<p
										className={`ml-2 text-sm font-medium ${
											stat.changeType === "increase"
												? "text-green-600 dark:text-green-400"
												: stat.changeType === "decrease"
												? "text-red-600 dark:text-red-400"
												: "text-gray-500 dark:text-gray-400"
										}`}
									>
										{stat.change}
									</p>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
