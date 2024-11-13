import React, { FC } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { render } from "@testing-library/react";
import { useProducts } from "../src/hooks/useProducts";
import Promo from "../src/pages/promo";
import mockProducts from "./db.json";

const mockedUseProduct = useProducts as jest.Mock<object>;

jest.mock("../src/hooks/useProducts");

interface Props {
  children: JSX.Element;
}

const QueryWrapper: FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("promo page", () => {
  beforeEach(() => {
    mockedUseProduct.mockImplementation(() => ({ isLoading: true }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without errors", async () => {
    expect.assertions(0);

    render(
      <QueryWrapper>
        <Promo />
      </QueryWrapper>
    );
  });

  it("render a checkout button", async () => {
    expect.assertions(1);
    const { getByText } = render(
      <QueryWrapper>
        <Promo />
      </QueryWrapper>
    );

    expect(getByText("Checkout")).toBeInTheDocument();
  });

  it("should default to 5 mins", async () => {
    expect.assertions(1);
    const { getByText } = render(
      <QueryWrapper>
        <Promo />
      </QueryWrapper>
    );

    expect(getByText(/5:00/i)).toBeInTheDocument();
  });

  it("should show 10 products", async () => {
    expect.assertions(1);
    mockedUseProduct.mockImplementation(() => ({
      isLoading: false,
      data: mockProducts,
    }));

    const { getAllByRole } = render(
      <QueryWrapper>
        <Promo />
      </QueryWrapper>
    );

    expect(getAllByRole("listitem")).toHaveLength(10);
  });
});
