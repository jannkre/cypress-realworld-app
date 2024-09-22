import { vi } from "vitest";

export default {
    get: vi.fn().mockReturnValue(() => Promise.resolve({ data: {} })),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
};