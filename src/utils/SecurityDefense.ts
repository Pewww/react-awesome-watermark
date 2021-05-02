interface SecurityDefenseProps {
  watermarkWrapperId: string;
  watermarkId: string;
}

export default class SecurityDefense {
  private watermarkWrapperId: string;
  private watermarkId: string;

  constructor({ watermarkWrapperId, watermarkId }: SecurityDefenseProps) {
    this.watermarkWrapperId = watermarkWrapperId;
    this.watermarkId = watermarkId;
  }

  public getDOM(id: string) {
    return document.getElementById(id);
  }

  public getWatermarkWrapperObserver() {
    const watermarkWrapper = this.getDOM(this.watermarkWrapperId);

    return new MutationObserver(mutations => {
      let removedWatermarkNode;

      mutations.forEach(mutation => {
        const removedNodes = Array.from(mutation.removedNodes) as HTMLElement[];
        removedWatermarkNode = removedNodes.find(
          node => node.id === this.watermarkId
        );
      });

      if (removedWatermarkNode) {
        watermarkWrapper!.prepend(removedWatermarkNode);
      }
    });
  }

  public getWatermarkObserver() {
    const watermark = this.getDOM(this.watermarkId);
    const attributes = watermark!.attributes;
    const initialAttributes = {} as Record<string, string>;

    Object.values(attributes).forEach(({ name, value }) => {
      initialAttributes[name] = value;
    });

    return new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        const target = mutation.target as HTMLDivElement;
        const attributeName = mutation.attributeName!;

        if (attributeName in initialAttributes) {
          if (
            target.getAttribute(attributeName) !==
            initialAttributes[attributeName]
          ) {
            target.setAttribute(
              attributeName,
              initialAttributes[attributeName]
            );
          }
        } else {
          target.removeAttribute(attributeName);
        }
      });
    });
  }
}
