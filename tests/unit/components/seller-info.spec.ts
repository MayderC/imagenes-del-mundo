import SellerInfo from "@/components/SellerInfo.vue";
import { mount } from "@vue/test-utils";
import { ISeller } from "../../../src/interfaces/seller.interface";
import { LIMIT_TO_WIN } from "./../../../src/constants/index";

describe("Test Seller Info props", () => {
  it("test if sellerinfo contains the name and points", () => {
    const props: ISeller = {
      id: 1,
      name: "Name",
      description: "",
      points: 7,
      status: "",
      identification: "",
      observations: "",
    };

    const wrapper = mount(SellerInfo, {
      props: {
        seller: props,
      },
    });

    const allp = wrapper.findAll("p");
    expect(allp[0].text()).toBe(props.name);
    expect(allp[1].text()).toBe("Actuales: " + props.points);
    expect(allp[2].text()).toBe("Restantes: " + (LIMIT_TO_WIN - props.points));
  });
});
