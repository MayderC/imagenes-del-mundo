import CardImage from "@/components/CardImage.vue";
import { mount } from "@vue/test-utils";

describe("Test CardImage component", () => {
  it("that should emit an event when like button is clicked", () => {
    const wrapper = mount(CardImage, {
      props: {
        image: {
          urls: {
            small: "http://url.image.com",
          },
          sellerID: 1,
        },
      },
    });

    wrapper.find("button").trigger("click");
    expect(wrapper.emitted()["like"][0]).toEqual([1]);
  });
});
