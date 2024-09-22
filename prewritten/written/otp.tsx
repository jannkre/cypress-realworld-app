import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// import "@testing-library/jest-dom";

import { screen, render, fireEvent, act, waitFor } from "@testing-library/react";
import OTP from "./utils/OTP.component.js";
import userEvent from "@testing-library/user-event";
import * as OTPCalls from "./utils/OTPCalls.js";
import { success, errorInvalidOTP } from "./__fixtures__/api-resp-otp-submit.js";
import axios from "./__mocks__/axios.js";


import { useStore } from "./utils/Store.js";

let initialState = useStore.getState() as any;



describe("Check OTP validation", () => {

    console.log(initialState);

    it ("has multiple login attempts", () => {
        useStore.setState({count: 20});
        render(<OTP />);
        screen.getByText("Login Counter: 20");
    });


    let user = {
        name: "Matthias",
        email: "janniskreis@gmail.com"
    };
    beforeEach(() => {
        // useStore.setState({count: 10});
        user = {
            name: "Matthias",
            email: "janniskreis@gmailss.com"
        }
        // console.log(axios);
        // vi.mock("axios", axios);
        // vi.mock("axios", axios);
        // const mocks = vi.hoisted(() => ({
        //     get: vi.fn().mockResolvedValue(() => Promise.resolve({ data: { token: "test" } })),
        //     post: vi.fn(),
        // }));
          
        // vi.mock('axios', async(importActual) => {
        //     const actual = await importActual<typeof import ('axios')>();
          
        //     const mockAxios = {
        //       default: {
        //         ...actual.default,
        //         create: vi.fn(() => ({
        //           ...actual.default.create(),
        //           get: mocks.get,
        //           post: mocks.post,
        //         })),
        //       },
        //     };
          
        //     return mockAxios;
        //   });
    });

    afterEach(() => {
        vi.resetAllMocks();
        vi.restoreAllMocks();
    });

    it("Invalid input length",async() => 
    {
        // @ts-ignore
        // let fetchSpy = vi.spyOn(global, "fetch");
        // let helperSpy = vi.spyOn(OTPCalls, "getOTPCallsSnippet");
        useStore.setState({count: 20});
        let e = render(<OTP />);
        // expect(e.baseElement).toMatchSnapshot();

        screen.getByText("Login Counter: 20");

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
        // screen.getByText("Resend OTP?").click();
        await userEvent.click(screen.getByText("Resend OTP?"));
        // expect(global.fetch).toHaveBeenCalledTimes(2);
        // expect(helperSpy).toHaveBeenCalledTimes(0);
        // console.log(fetchSpy.mock.results);
        // console.log(helperSpy.mock.results);

        // await userEvent.click(screen.getByText("Resend OTP?"));
        // fireEvent(screen.getByText("Submit"), new MouseEvent('click', {
        //     bubbles: true,
        //     cancelable: true,
        // }));

        await waitFor(() => {
            expect(screen.getByText("Resend OTP?")).toBeEnabled()
        }, {timeout: 4000});
        screen.getByText("Login Counter: 21");
        // expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/whatever", {});

    }, 10000);
    

    it ("check failed OTP submission", async () => {
        global.fetch = vi.fn()
            .mockRejectedValueOnce(errorInvalidOTP)
            .mockResolvedValueOnce(success);
        render(<OTP />);
        let elems = screen.getAllByPlaceholderText("000");
        for (let el of elems) {
            await userEvent.type(el, "230");
        }
        // console.log(elems[0].value);
        let exp = expect(elems[0].value);
        exp.toBe("230");
        exp.toMatch(/[0-9]/g);
        // exp.not.toBe("230");
        exp.string("230");
        
        exp.toBeTypeOf("string");
        expect(elems[0].value).toMatch(/[0-9]/g);

        expect(screen.getByText("Submit")).toBeEnabled();
        await userEvent.click(screen.getByText("Submit"));
        // expect(screen.getByTestId("serverResp").textContent).toBe(error.message);
        // await userEvent.click(screen.getByText("Submit"));
        // expect(screen.getByTestId("serverResp").textContent).toBe(success.data.token);
    });


    it.skipIf(
        (user as any).email.endsWith("gmail.com") == false
    ) ("Is disabled after resend OTP", async () => 
    { 
        // global.fetch = vi.fn().mockResolvedValue({my: "data 2"});
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

        // expect(screen.getByTestId("serverResp").textContent).toBe("Invalid OTP");
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
    it ("Auth: Catch successful OTP submission", () => {

    });

    it ("Auth: Default data", () => {
        let data = {
            name: "Matthias"
        }
        const {rerender} = render(<OTP defaultData={data}/>);
        screen.getByText("Matthias");

        act(() => {data.name = "Nadia";});
        // rerender(<OTP defaultData={data}/>);
        // screen.getByText("Nadia");
    });

    
    it ("Axios mock", async () => {
        render(<OTP />);
        let elems = screen.getAllByPlaceholderText("000");
        for (let el of elems) {
            await userEvent.type(el, "230");
        }
        // console.log(elems[0].value);
        // let exp = expect(elems[0].value);
        // exp.toBe("230");
        // exp.toMatch(/[0-9]/g);
        // // exp.not.toBe("230");
        // exp.string("230");
        
        // exp.toBeTypeOf("string");
        // expect(elems[0].value).toMatch(/[0-9]/g);

        expect(screen.getByText("Submit")).toBeEnabled();
        // await userEvent.click(screen.getByText("Submit"));
        // await waitFor(() => {screen.getByText("logged")});
        // expect(screen.getByTestId("serverResp").textContent).toBe(error.message);
        // await userEvent.click(screen.getByText("Submit"));
        // expect(screen.getByTestId("serverResp").textContent).toBe(success.data.token);
        // expect(axios.get).toHaveBeenCalledTimes(1);
    });

})