import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";
import OTP from "../components/Custom/OTP.component";
import userEvent from "@testing-library/user-event";
import * as OTPCalls from "../utils/Custom/OTPCalls";
// import "@testing-library/jest-dom";

describe("Check OTP validation", () => {

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("Invalid input length",async() => 
    {
        // @ts-ignore
        let fetchSpy = vi.spyOn(global, "fetch");
        let helperSpy = vi.spyOn(OTPCalls, "getOTPCallsSnippet");
        // OTPCalls.getOTPCallsSnippet = vi.fn().mockReturnValue(true);
        // global.fetch = vi.fn().mockResolvedValue({my: "data"});

        let e = render(<OTP />);
        expect(e.baseElement).toMatchSnapshot();
        let elems = screen.getAllByPlaceholderText("000");
        expect(elems.length).toBe(2);
        expect(elems[0]);

        expect(elems[0]).toBeInTheDocument();
        await userEvent.type(elems[0], "230");
        expect((elems[0] as HTMLInputElement).value).toBe("230");
        expect(screen.getByText("Submit")).toBeDisabled();
        await userEvent.type(elems[1], "460");
        expect(screen.getByText("Submit")).toBeEnabled();

        fireEvent(screen.getByText("Submit"), new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }));
        screen.getByText("Resend OTP?").click();
        expect(global.fetch).toHaveBeenCalledTimes(1);
        console.log(fetchSpy.mock.results);
        console.log(helperSpy.mock.results);
        // console.log(stateSpy.mock.calls);

        expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/whatever", {});

        // let el = await screen.findByText("data");
        // console.log(el.textContent);

        // expect(screen.getAllByPlaceholderText("000")[0]).toHaveClass("Mui-disabled");
    });


    it.skipIf(false)("Is disabled after resend OTP", async () => 
    { 
        global.fetch = vi.fn().mockResolvedValue({my: "data 2"});
        render(<OTP />);
        let elems = screen.getAllByPlaceholderText("000");
        expect(elems.length).toBe(2);

        expect(elems[0]).toBeInTheDocument();
        await userEvent.type(elems[0], "230");
        expect((elems[0] as HTMLInputElement).value).toBe("230");

        expect(screen.getByText("Submit")).toBeDisabled();

        await userEvent.type(elems[1], "460");
        expect(screen.getByText("Submit")).toBeEnabled();

        await userEvent.click(screen.getByText("Submit"));

        expect(screen.getByTestId("serverResp").textContent).toBe("data 2");
    });


    it ("Is enabled when Inputs filled", () => {
        render(<OTP />);

        let wrap = screen.getByTestId("input-wrapper");
        expect(wrap.querySelector("input")).not.toBeNull();
    });


    // fetch API
    it ("Catch failed OTP submission", () => {
        global.fetch = vi.fn().mockRejectedValue({message: "shit stuff"});
    });

    // fetch API
    it ("Catch successful OTP submission", () => {

    });

})