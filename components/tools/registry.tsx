import LoanCalculator from "./LoanCalculator";
import ZakatCalculator from "./ZakatCalculator";
import GratuityCalculator from "./GratuityCalculator";
import SalaryCalculator from "./SalaryCalculator";
import BNPLCalculator from "./BNPLCalculator";
import CurrencyConverter from "./CurrencyConverter";
import MortgageCalculator from "./MortgageCalculator";
import CarFinanceCalculator from "./CarFinanceCalculator";
import VATCalculator from "./VATCalculator";
import SavingsGoalCalculator from "./SavingsGoalCalculator";
import DebtPayoffCalculator from "./DebtPayoffCalculator";
import InvestmentGrowthCalculator from "./InvestmentGrowthCalculator";

export const TOOL_COMPONENTS: Record<string, React.ComponentType<{ locale: string }>> = {
  "loan-calculator": LoanCalculator,
  "zakat-calculator": ZakatCalculator,
  "gratuity-calculator": GratuityCalculator,
  "salary-calculator": SalaryCalculator,
  "bnpl-calculator": BNPLCalculator,
  "currency-converter": CurrencyConverter,
  "mortgage-calculator": MortgageCalculator,
  "car-finance-calculator": CarFinanceCalculator,
  "vat-calculator": VATCalculator,
  "savings-goal-calculator": SavingsGoalCalculator,
  "debt-payoff-calculator": DebtPayoffCalculator,
  "investment-growth-calculator": InvestmentGrowthCalculator,
};
