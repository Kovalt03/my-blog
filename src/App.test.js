import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("블로그 글 목록을 표시하고 상세 화면으로 이동한다", async () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  await userEvent.click(screen.getByRole("link", { name: "첫 번째 글" }));
  expect(screen.getByRole("heading", { name: "첫 번째 글" })).toBeInTheDocument();
  expect(screen.getByText(/Markdown으로 작성한 콘텐츠/)).toBeInTheDocument();
});
