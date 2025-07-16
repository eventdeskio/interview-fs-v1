export interface BudgetItem {
  services: string;
  qty: string;
  tax: string;
  rate: string;
  total_amount: string;
}

export const data: BudgetItem[] = [
  {
    services: "Stage Decoration",
    qty: "1",
    tax: "5%",
    rate: "1000",
    total_amount: "1000",
  },
  {
    services: "Catering services",
    qty: "1",
    tax: "5%",
    rate: "1000",
    total_amount: "1000",
  },
  {
    services: "Photography and Videography",
    qty: "1",
    tax: "5%",
    rate: "1000",
    total_amount: "1000",
  },
  {
    services: "Lighting Design",
    qty: "1",
    tax: "5%",
    rate: "1000",
    total_amount: "1000",
  },
];
