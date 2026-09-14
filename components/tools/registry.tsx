import LoanCalculator from "./LoanCalculator";
import ZakatCalculator from "./ZakatCalculator";
import GratuityCalculator from "./GratuityCalculator";
import SalaryCalculator from "./SalaryCalculator";
import BNPLCalculator from "./BNPLCalculator";
import CurrencyConverter from "./CurrencyConverter";

export const TOOL_COMPONENTS: Record<string, React.ComponentType<{ locale: string }>> = {
  "loan-calculator": LoanCalculator,
  "zakat-calculator": ZakatCalculator,
  "gratuity-calculator": GratuityCalculator,
  "salary-calculator": SalaryCalculator,
  "bnpl-calculator": BNPLCalculator,
  "currency-converter": CurrencyConverter,
};
