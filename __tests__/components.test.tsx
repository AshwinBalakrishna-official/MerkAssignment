import { act, fireEvent, render, screen } from "@testing-library/react";
import { DrugCard } from "@/components/DrugCard";
import { Pagination } from "@/components/Pagination";
import { SearchBar, SEARCH_DEBOUNCE_MS } from "@/components/SearchBar";

const replace = vi.fn();
let params = new URLSearchParams();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
  usePathname: () => "/",
  useSearchParams: () => params,
}));

beforeEach(() => {
  replace.mockClear();
  params = new URLSearchParams();
});

describe("DrugCard", () => {
  it("shows name, status, description and links to details", () => {
    render(<ul><DrugCard drug={{ id: "x-1", name: "Xyz", status: "Approved", description: "Does things" }} /></ul>);
    expect(screen.getByText("Xyz")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("Does things")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/drugs/x-1");
  });
});

describe("Pagination", () => {
  const hrefFor = (p: number) => `/?page=${p}`;
  it("renders nothing for a single page", () => {
    const { container } = render(<Pagination page={1} totalPages={1} hrefFor={hrefFor} />);
    expect(container).toBeEmptyDOMElement();
  });
  it("links to neighbouring pages", () => {
    render(<Pagination page={2} totalPages={3} hrefFor={hrefFor} />);
    expect(screen.getByText("Previous")).toHaveAttribute("href", "/?page=1");
    expect(screen.getByText("Next")).toHaveAttribute("href", "/?page=3");
  });
  it("disables Previous on the first page", () => {
    render(<Pagination page={1} totalPages={3} hrefFor={hrefFor} />);
    expect(screen.getByText("Previous")).toHaveAttribute("aria-disabled", "true");
  });
});

describe("SearchBar", () => {
  it("debounces typing into a single URL update", () => {
    vi.useFakeTimers();
    render(<SearchBar />);
    const input = screen.getByLabelText("Search drugs by name");
    fireEvent.change(input, { target: { value: "g" } });
    fireEvent.change(input, { target: { value: "glu" } });
    expect(replace).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS); });
    expect(replace).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith("/?drugName=glu");
    vi.useRealTimers();
  });

  it("updates status immediately and resets the page", () => {
    params = new URLSearchParams("drugName=a&page=3");
    render(<SearchBar />);
    fireEvent.change(screen.getByLabelText("Filter by status"), { target: { value: "Approved" } });
    expect(replace).toHaveBeenCalledWith("/?drugName=a&status=Approved");
  });

  it("clears the param when the search is emptied", () => {
    vi.useFakeTimers();
    params = new URLSearchParams("drugName=abc");
    render(<SearchBar />);
    fireEvent.change(screen.getByLabelText("Search drugs by name"), { target: { value: "" } });
    act(() => { vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS); });
    expect(replace).toHaveBeenCalledWith("/");
    vi.useRealTimers();
  });
});
