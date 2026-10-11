import { render, screen } from "@testing-library/react";
import { Badge, ButtonLink, Select, TextInput } from "@/design-system";

describe("design system", () => {
  it("TextInput exposes its label to assistive tech", () => {
    render(<TextInput label="Search" />);
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });

  it("Select renders options and is labelled", () => {
    render(<Select label="Status" options={[{ value: "", label: "All" }, { value: "a", label: "A" }]} />);
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(2);
  });

  it("Badge renders its content", () => {
    render(<Badge tone="success">Approved</Badge>);
    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("ButtonLink is an inert span when disabled", () => {
    render(<ButtonLink href="/x" disabled>Next</ButtonLink>);
    expect(screen.getByText("Next")).toHaveAttribute("aria-disabled", "true");
    expect(screen.queryByRole("link")).toBeNull();
  });
});
