"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Star as FaStar, Heart } from "lucide-react";
import {
  Product,
  VariantObject,
  Image as InterfaceImage,
} from "@/types/product";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent as CardBody } from "@/components/ui/card";
import { Separator as Divider } from "@/components/ui/separator";

interface ProductCardProps {
  data?: Product;
  width?: string | null;
  base?: boolean;
}

const DEFAULT_PRODUCT: Product = {
  id: 3,
  categoryname: "Gold",
  subcategoryname: "Buddha",
  rating: null,
  product_name: "Laughing Buddha",
  description:
    "#white #small\r\n## description : Handcrafter statue made in Nepal with more than 100 years of experiance .\r\n\r\n## Size & Weight \r\n - Height   :           3f, 5f, 7f\r\n - Weight   :           14kg, 25kg, 30kg\r\n\r\n## Composition\r\n - Metal :  Stainless steel or Copper\r\n - Coating :  14K gold , SIlver or Brash",
  productslug: "laughing-buddha-l6C3cOGxISbtBt",
  category: 4,
  subcategory: 15,
  variants: [
    {
      id: 4,
      product_stripe_id: null,
      size: "25",
      price: "15000.00",
      discount: 10,
      stock: 9,
      product: 3,
    },
    {
      id: 5,
      product_stripe_id: null,
      size: "50",
      price: "500.00",
      discount: 10,
      stock: 8,
      product: 3,
    },
  ],
  images: [
    {
      id: 9,
      image:
        "https://backendcore.vickytajpuriya.com/media/product_images/IMG_9681_UMYSdhO.png",
    },
    {
      id: 10,
      image:
        "https://backendcore.vickytajpuriya.com/media/product_images/IMG_9681.png",
    },
    {
      id: 11,
      image:
        "https://backendcore.vickytajpuriya.com/media/product_images/IMG_9681_0mGWFtL_xIWQ27S.png",
    },
  ],
};

export const ProductCard: React.FC<ProductCardProps> = ({
  data = DEFAULT_PRODUCT,
  width,
  base,
}) => {
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const [variantsData, setVariantsData] = useState<
    VariantObject[] | VariantObject | null
  >(null);
  const [selectedSize, setSelectedSize] = useState<{
    id: number;
    size: string | null;
  } | null>(null);

  useEffect(() => {
    if (data?.variants && Array.isArray(data.variants)) {
      const variants = data.variants;
      const sortedVariants = [...variants].sort(
        (a, b) => Number(a.size) - Number(b.size)
      );
      setVariantsData(sortedVariants);
      if (sortedVariants.length > 0) {
        setSelectedSize({
          id: sortedVariants[0].id,
          size: sortedVariants[0].size,
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (data?.variants) {
      setVariantsData(data.variants);
      if (!Array.isArray(data.variants)) {
        setSelectedSize({
          id: data.variants.id,
          size: data.variants.size,
        });
      }
    }
  }, [data]);

  const getVariantData = (
    variantsData: VariantObject[] | VariantObject | null,
    key: keyof VariantObject,
    index: number = 0
  ): any => {
    if (Array.isArray(variantsData)) {
      const variant = variantsData.find((variant) => variant.id === index);
      return variant ? variant[key] : null;
    } else if (variantsData) {
      return variantsData[key];
    }
    return null;
  };

  const convertedPrice = getVariantData(
    variantsData,
    "price",
    selectedSize?.id
  );

  const discount = getVariantData(variantsData, "discount", selectedSize?.id);
  const stocks = getVariantData(variantsData, "stock", selectedSize?.id);

  const finalPrice = useMemo(() => {
    return Number(
      (convertedPrice - convertedPrice * (discount / 100)).toFixed(2)
    );
  }, [convertedPrice, discount]);

  const productslug = data.productslug;

  return (
    <section className="relative w-full flex gap-5">
      <span
        className={cn(
          "relative rounded-lg overflow-hidden group grow isolation-auto z-10 svelte-483qmb p-1",
          "bg-white dark:bg-neutral-950",
          "flex flex-col gap-1"
        )}
      >
        <span
          className={cn(
            `absolute z-10 pl-1 top-2 flex items-center gap-1 h-5 w-full font-normal`
          )}
        >
          {stocks === 0 ? (
            <span className="absolute left-1 px-2 h-full flex dark:bg-zinc-300 bg-neutral-900 rounded-md text-xs items-center justify-center text-white dark:text-black gap-1">
              Out of stock
            </span>
          ) : (
            <>
              {discount > 0 && (
                <span className="px-2 h-full flex dark:bg-zinc-300 bg-neutral-900 rounded-md text-xs items-center justify-center text-white dark:text-black gap-1">
                  {discount}% Off
                </span>
              )}
            </>
          )}
          <span className="h-full flex text-xs items-center justify-center absolute right-2">
            <Button
              className={cn("p-2", "!bg-transparent hover:bg-transparent m-0")}
              variant="secondary"
              onClick={() => setIsInWishlist(!isInWishlist)}
            >
              <Heart
                size={18}
                className={cn(
                  "dark:stroke-white stroke-neutral-800 fill-neutral-100/20",
                  isInWishlist && "fill-black dark:fill-white"
                )}
              />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </span>
        </span>
        <Swiper
          navigation
          pagination={{ type: "bullets", clickable: true }}
          loop={true}
          effect="fade"
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          style={{ margin: "0px" }}
          className={cn(`w-full h-[310px] rounded-lg `, width)}
        >
          {data &&
            data?.images &&
            data.images.map((data: InterfaceImage, index: number) => {
              const isPng = ["not.png", "not.webp"].some((ext) =>
                data.image.endsWith(ext)
              );
              const imageClassName = isPng ? "w-full h-full object-cover" : "";
              return (
                <SwiperSlide key={index}>
                  <div className="h-full w-full left-0 overflow-hidden top-0 bg-neutral-100 dark:bg-zinc-950 flex items-center justify-center">
                    <div
                      className={cn(imageClassName)}
                    >
                      <Image
                        src={data.image}
                        width={600}
                        height={600}
                        priority
                        className={cn(
                          " w-full cursor-pointer h-[300px]  object-contain",
                          imageClassName
                        )}
                        alt={productslug}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
        <span
          className={cn(
            "relative w-full h-[90px] flex flex-col rounded-lg p-3 py-2 justify-between dark:bg-transparent",
            base && "bg-[url('/bg.svg')] bg-cover dark:bg-img-inherit"
          )}
        >
          <div className="flex gap-3 items-center">
            <div className="flex flex-col cursor-pointer">
              <p className="text-sm">{data.product_name}</p>
              <p className="text-xs font-normal text-neutral-500 dark:text-zinc-100/80">
                {data.categoryname}
              </p>
            </div>
          </div>
          <div className="flex w-full justify-between items-center gap-1">
            <span className={cn("flex", discount > 0 && " gap-2")}>
              <p className="text-sm">{discount > 0 && `रु ${finalPrice}`}</p>
              <p
                className={cn(
                  "text-sm",
                  discount > 0 && "text-neutral-400 line-through"
                )}
              >
                रु {convertedPrice}
              </p>
            </span>
            {variantsData && (
              <Cartbutton
                data={data.id}
                stocks={stocks}
                variantsData={variantsData}
                setSelectedSize={setSelectedSize}
                selectedSize={selectedSize}
                finalPrice={finalPrice}
                convertedPrice={convertedPrice}
                symbol="रु"
              />
            )}
          </div>
        </span>
      </span>
    </section>
  );
};

export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        "w-full relative p-1 h-full flex flex-col gap-1 rounded-lg",
        className
      )}
    >
      <div className="w-full animate-pulse bg-neutral-800/10 dark:bg-neutral-100/10 h-[390px] rounded-lg"></div>
      <div className="w-full flex flex-col p-2 animate-pulse bg-neutral-800/10 dark:bg-neutral-100/10 h-[100px] rounded-lg ">
        <span className="w-full h-[40px] flex">
          <span className="animate-pulse w-48 h-10 rounded-lg bg-neutral-800/10 dark:bg-neutral-100/10"></span>
        </span>
        <span className="w-full h-[40px] flex flex-row items-end justify-between">
          <span className="animate-pulse w-32 h-7 rounded-lg bg-neutral-800/10 dark:bg-neutral-100/10"></span>
          <span className="animate-pulse w-16 h-7 rounded-lg bg-neutral-800/10 dark:bg-neutral-100/10"></span>
        </span>
      </div>
    </section>
  );
};

interface CartbuttonProps {
  data: number;
  stocks: number;
  variantsData: VariantObject | VariantObject[];
  selectedSize?: any;
  setSelectedSize?: any;
  finalPrice: any;
  convertedPrice: any;
  symbol: any;
}

export const getSizeCategory = (index: number) => {
  const sizeNames = [
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "XXX-Large",
  ];
  return sizeNames[index] || `Size-${index + 1}`;
};

const Cartbutton = ({
  data,
  stocks,
  variantsData,
  convertedPrice,
  symbol,
  selectedSize,
  setSelectedSize,
  finalPrice,
}: CartbuttonProps) => {
  const [display, setDisplay] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setDisplay(false);
    }
  };

  useEffect(() => {
    if (display) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [display]);

  const sortedVariants = Array.isArray(variantsData)
    ? [...variantsData].sort((a, b) => Number(a.size) - Number(b.size))
    : [];

  return (
    <>
      {Array.isArray(variantsData) || stocks === 0 ? (
        <Button
          variant="active"
          size="sm"
          className={cn(
            "h-[30px] flex justify-center items-center text-sm gap-2",
            stocks === 0 && Array.isArray(variantsData) && "shadow-none"
          )}
          onClick={() => setDisplay(true)}
        >
          {stocks === 0 && !Array.isArray(variantsData) ? (
            "Notify me"
          ) : (
            <>
              <ShoppingBag className="w-3 h-3" />
              Add
            </>
          )}
        </Button>
      ) : (
        <Button
          variant="active"
          size="sm"
          className={cn(
            "h-[30px] flex justify-center items-center text-sm gap-2"
          )}
        >
          <ShoppingBag className="w-3 h-3" />
          Add
        </Button>
      )}
      <motion.div
        ref={ref}
        initial={{ bottom: "-500px" }}
        animate={{ bottom: display ? "0px" : "-500px" }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          ease: "easeInOut",
        }}
        {...{
          className: cn(
            "absolute z-10 w-full left-0  max-h-52 rounded-lg backdrop-blur bg-zinc-200/60 dark:bg-[#121212db] p-2"
          ),
        }}
      >
        {Array.isArray(variantsData) ? (
          <>
            <span className="flex gap-3 flex-col">
              <p className="text-sm">Choose Statue Size</p>
              <span className="flex gap-2 items-center">
                {sortedVariants.map((variant, index) => (
                  <Button
                    key={variant.id}
                    variant={
                      selectedSize?.id === variant.id ? "active" : "secondary"
                    }
                    size="sm"
                    onClick={() =>
                      setSelectedSize({
                        id: variant.id,
                        size: variant.size,
                        price: variant.price,
                        discount: variant.discount,
                      })
                    }
                  >
                    {getSizeCategory(index)}
                  </Button>
                ))}
              </span>
            </span>
            {stocks === 0 ? (
              <></>
            ) : (
              <Card className="w-full mt-5 rounded-md bg-white dark:bg-neutral-900 border-none shadow-none p-3">
                <CardBody>
                  <span className="flex justify-between items-center">
                    <p className="text-xs text-zinc-400">Statue Size</p>
                    <p className="text-xs text-zinc-400">
                      {selectedSize?.size} cm
                    </p>
                  </span>
                  <Divider className="my-1" />
                  <span className="flex justify-between items-center">
                    <p className="text-xs text-zinc-400">Price</p>
                    <span className="flex gap-2">
                      <p className="text-sm">
                        {selectedSize &&
                          selectedSize?.discount > 0 &&
                          `${symbol} ${finalPrice}`}
                      </p>
                      <p
                        className={cn(
                          "text-sm",
                          selectedSize &&
                            selectedSize?.discount > 0 &&
                            "text-neutral-500 line-through"
                        )}
                      >
                        {symbol} {convertedPrice}
                      </p>
                    </span>
                  </span>
                </CardBody>
              </Card>
            )}
            {selectedSize?.id && stocks !== 0 && (
              <Button
                variant="active"
                size="sm"
                className={cn(
                  "h-[30px] flex justify-center items-center text-sm gap-2 w-full mt-2"
                )}
              >
                <ShoppingBag className="w-3 h-3" />
                Add
              </Button>
            )}
          </>
        ) : (
          <></>
        )}
      </motion.div>
    </>
  );
};
