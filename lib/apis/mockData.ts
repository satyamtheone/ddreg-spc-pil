// Mock data for authentication
export const mockUsers = [
  {
    id: "1",
    email: "test.u@ddreg.in",
    password: "test123",
    name: "Pranav Choudhary",
    twoFactorRequired: true,
    role: "user"
  },
  {
    id: "2",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    twoFactorRequired: false,
    role: "admin"
  },
  {
    id: "3",
    email: "demo@example.com",
    password: "demo123",
    name: "Demo User",
    twoFactorRequired: true,
    role: "user"
  }
];

export const mockOtpData: Record<string, string> = {};

export const generateOTP = (): string => {
  return '123456';
};

export const mockDashboardCards = [
  {
    title: "Documents Generated",
    icon: "Icon-01.svg",
    iconBgColor: "#17BDD3",
    value: "127",
    stats: "+12% vs last mont h",
    statsColor: "#17BDD3",
    isTrendingUp: true
  },
  {
    title: "Pending Approvals",
    icon: "Icon-02.svg",
    iconBgColor: "#FFB51D",
    value: "8",
    stats: "+12% vs last month",
    statsColor: "#FFB51D",
    isTrendingUp: true
  },
  {
    title: "Approved This Month",
    icon: "Icon-03.svg",
    iconBgColor: "#08DD7D",
    value: "34",
    stats: "+12% vs last month",
    statsColor: "#08DD7D",
    isTrendingUp: true
  },
  {
    title: "Require Attention",
    icon: "Icon-04.svg",
    iconBgColor: "#FF4949",
    value: "12",
    stats: "+12% vs last month",
    statsColor: "#FF4949",
    isTrendingUp: true
  }
];

// Simulate API delay
export const simulateDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
