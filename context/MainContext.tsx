"use client";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface MainContextType {
  currency: string;
  layout: string;
  setLayout: Dispatch<SetStateAction<string>>;
  setCurrency: Dispatch<SetStateAction<string>>;
  formatCurrency: (
    input: number,
    fromCurrency: string,
    toCurrency: string
  ) => string | undefined;
  isLoading: boolean;
  expandedSection: string | null;
  setExpandedSection: Dispatch<SetStateAction<string | null>>;
}

const MainContext = createContext<MainContextType | null>(null);

export const useMainContext = () => {
  return useContext(MainContext);
};

export const MainContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currency, setCurrency] = useState<string>("USD");
  const [layout, setLayout] = useState("variant_1")
  const [exchangeData, setExchangeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://open.er-api.com/v6/latest/USD`
        );
        const data = await response.json();
        setExchangeData(data.rates);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  function formatCurrency(
    input: number,
    fromCurrency: string,
    toCurrency: string
  ): string | undefined {
    if (!exchangeData) return undefined;

    const fromRate = exchangeData[fromCurrency];
    const toRate = exchangeData[toCurrency];
    let decimalCount = 0
    if(currency=="USD"){
      decimalCount = 2
    }

    if (fromRate && toRate) {
      const convertedAmount = (input / fromRate) * toRate;
      return `${convertedAmount.toFixed(decimalCount)} ${toCurrency}`;
    }
  }

  return (
    <MainContext.Provider
      value={{ currency, setCurrency, formatCurrency, isLoading, layout, setLayout, expandedSection, setExpandedSection }}
    >
      {children}
    </MainContext.Provider>
  );
};
