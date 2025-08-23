import React, { ReactNode } from "react";

type HeadingProps = {
	as?: React.ElementType;
	size?: keyof typeof sizeClasses;
	font?: keyof typeof fontClasses;
	color?: keyof typeof colorClasses;
	align?: keyof typeof alignClasses;
	spacing?: keyof typeof spacingClasses;
	className?: string;
	children?: ReactNode;
	[key: string]: any;
};

//? Types
const sizeClasses = {
	xs: "text-xs",
	sm: "text-sm",
	base: "text-base",
	lg: "text-lg",
	xl: "text-xl",
	"2xl": "text-2xl",
	"3xl": "text-3xl",
	"4xl": "text-4xl",
	"5xl": "text-5xl",
	"6xl": "text-6xl",
	"7xl": "text-7xl",
	"8xl": "text-8xl",
	"9xl": "text-9xl",
};

const fontClasses = {
	thin: "font-thin",
	extralight: "font-extralight",
	light: "font-light",
	normal: "font-normal",
	medium: "font-medium",
	semibold: "font-semibold",
	bold: "font-bold",
	extrabold: "font-extrabold",
	black: "font-black",
};

const colorClasses = {
	default: "text-gray-900 dark:text-white",
	muted: "text-gray-600 dark:text-gray-300",
	light: "text-gray-500 dark:text-gray-400",
	primary: "text-blue-600 dark:text-blue-400",
	secondary: "text-purple-600 dark:text-purple-400",
	success: "text-green-600 dark:text-green-400",
	warning: "text-yellow-600 dark:text-yellow-400",
	danger: "text-red-600 dark:text-red-400",
	white: "text-white",
	black: "text-black",
};

const alignClasses = {
	left: "text-left",
	center: "text-center",
	right: "text-right",
	justify: "text-justify",
};

const spacingClasses = {
	none: "",
	tight: "leading-tight",
	normal: "leading-normal",
	relaxed: "leading-relaxed",
	loose: "leading-loose",
};

const Heading = ({
	as = "h1",
	size = "xl",
	font = "bold",
	color = "default",
	align = "left",
	spacing = "normal",
	className = "",
	children,
	...props
}: HeadingProps) => {
	// Define size mappings
	const sizeClasses = {
		xs: "text-xs",
		sm: "text-sm",
		base: "text-base",
		lg: "text-lg",
		xl: "text-xl",
		"2xl": "text-2xl",
		"3xl": "text-3xl",
		"4xl": "text-4xl",
		"5xl": "text-5xl",
		"6xl": "text-6xl",
		"7xl": "text-7xl",
		"8xl": "text-8xl",
		"9xl": "text-9xl",
	};

	// Define font mappings
	const fontClasses = {
		thin: "font-thin",
		extralight: "font-extralight",
		light: "font-light",
		normal: "font-normal",
		medium: "font-medium",
		semibold: "font-semibold",
		bold: "font-bold",
		extrabold: "font-extrabold",
		black: "font-black",
	};

	// Define color mappings
	const colorClasses = {
		default: "text-gray-900 dark:text-white",
		muted: "text-gray-600 dark:text-gray-300",
		light: "text-gray-500 dark:text-gray-400",
		primary: "text-blue-600 dark:text-blue-400",
		secondary: "text-purple-600 dark:text-purple-400",
		success: "text-green-600 dark:text-green-400",
		warning: "text-yellow-600 dark:text-yellow-400",
		danger: "text-red-600 dark:text-red-400",
		white: "text-white",
		black: "text-black",
	};

	// Define alignment mappings
	const alignClasses = {
		left: "text-left",
		center: "text-center",
		right: "text-right",
		justify: "text-justify",
	};

	// Define spacing mappings
	const spacingClasses = {
		none: "",
		tight: "leading-tight",
		normal: "leading-normal",
		relaxed: "leading-relaxed",
		loose: "leading-loose",
	};

	// Combine all classes
	const classes = [
		sizeClasses[size],
		fontClasses[font],
		colorClasses[color],
		alignClasses[align],
		spacingClasses[spacing],
		className,
	]
		.filter(Boolean)
		.join(" ");

	// Create the element
	const Component = as;

	return (
		<Component className={classes} {...props}>
			{children}
		</Component>
	);
};

export default Heading