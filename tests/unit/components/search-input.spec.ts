import SearchInput from "@/components/SearchInput.vue";
import { mount } from "@vue/test-utils";

describe("Test SearchInput component", () => {
  it("checks if the text inserted in the input is saved in the 'toSearch' property", async () => {
    const value = "hello input";
    const wrapper = mount(SearchInput);
    await wrapper.find("input[id='search']").setValue(value);
    expect(wrapper.vm["toSearch"]).toBe(value);
  });

  it("checks if event search was emmited", async () => {
    const wrapper = mount(SearchInput);
    const value = "Hola";
    await wrapper.find("input[id='search']").setValue(value);
    wrapper.find("form").trigger("submit");

    expect(wrapper.emitted()["search"][0]).toEqual([value]);
  });
});
