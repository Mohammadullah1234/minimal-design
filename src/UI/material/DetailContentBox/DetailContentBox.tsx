import { cardMediaMainProps } from "@/UI/Functions";
import Box from "@/UI/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LightBox from "@/UI/material/LightBox";
import { CircleRounded } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@/UI/material/Stack";
import { DetailContentBoxProps, ItemsProps } from "./DetailContentBoxProps";
import {
  detailContentBadgeStyles,
  detailContentBoxAvatarBadgeStyles,
  detailContentBoxAvatarStyles,
  detailContentBoxStyles,
  detailContentCaptionStyles,
  detailContentItemContainerStyles,
  detailContentTitleStyles,
} from "./DetailContentBoxStyles";
import clsx from "clsx";
import { detailContentBoxClasses } from "./DetailContentBoxClasses";
import { memo, useCallback, useMemo } from "react";
import { primary } from "@/UI/colors";
import { Divider, Skeleton } from "@mui/material";
import combineSxProps from "@/UI/utils/combineSxProps";

const defaultSlots = {
  title: undefined,
  caption: undefined,
  avatar: undefined,
  lightBox: undefined,
  badge: undefined,
  circle: undefined,
  endElement: undefined,
};

const DetailContentBox = memo(
  ({
    icon,
    endElement,
    title,
    caption,
    items = [],
    loading,
    dotColor = "default",
    useDot = false,
    useDivider = false,
    disableCircleDot = false,
    selectable = false,
    focused = false,
    lightBoxContent,
    lightBoxColor = "default",
    badgeContent,
    badgeColor,
    slots = defaultSlots,
    slotProps = defaultSlots,
    children,
    ...props
  }: DetailContentBoxProps) => {
    const {
      title: TitleSlot,
      caption: CaptionSlot,
      icon: IconSlot,
      lightBox: LightBoxSlot,
      badge: BadgeSlot,
      circle: CircleSlot,
      endElement: FooterSectionSlot,
    } = slots;
    const {
      title: TitleProps,
      caption: CaptionProps,
      icon: IconProps,
      iconContainer: IconContainerProps,
      lightBox: LightBoxProps,
      badge: BadgeProps,
      circle: CircleProps,
      endElement: EndElemtnProps,
    } = slotProps;

    const renderTitle = useMemo(
      () =>
        TitleSlot ? (
          <TitleSlot>{title}</TitleSlot>
        ) : (
          <Typography
            variant="h4"
            {...TitleProps}
            sx={combineSxProps(detailContentTitleStyles, TitleProps?.sx)}
            className={clsx(
              detailContentBoxClasses.title,
              TitleProps?.className || ""
            )}
          >
            {title}
          </Typography>
        ),
      [TitleSlot, title, TitleProps]
    );

    const renderLightBox = useMemo(
      () =>
        lightBoxContent ? (
          LightBoxSlot ? (
            <LightBoxSlot>{lightBoxContent}</LightBoxSlot>
          ) : (
            lightBoxContent && (
              <LightBox
                color={lightBoxColor}
                variant="outlined"
                {...LightBoxProps}
                className={clsx(
                  detailContentBoxClasses.lightBox,
                  LightBoxProps?.className || ""
                )}
                sx={combineSxProps(detailContentBadgeStyles, LightBoxProps?.sx)}
              >
                {lightBoxContent}
              </LightBox>
            )
          )
        ) : null,
      [lightBoxColor, LightBoxSlot, LightBoxProps, lightBoxContent]
    );

    const renderCaption = useMemo(
      () =>
        caption ? (
          CaptionSlot ? (
            <CaptionSlot>{caption}</CaptionSlot>
          ) : (
            <Typography
              component="p"
              {...CaptionProps}
              sx={combineSxProps(detailContentCaptionStyles, CaptionProps?.sx)}
              className={clsx(
                detailContentBoxClasses.caption,
                CaptionProps?.className || ""
              )}
            >
              {caption}
            </Typography>
          )
        ) : null,
      [caption, CaptionProps, CaptionSlot]
    );

    const renderItems = useMemo(
      () =>
        items.map((elm, i) => (
          <DetailContentItem
            key={i}
            {...elm}
            circle={
              CircleSlot ? (
                <CircleSlot />
              ) : (
                !disableCircleDot &&
                i !== items.length - 1 && (
                  <CircleRounded
                    {...CircleProps}
                    className={clsx(
                      detailContentBoxClasses.circle,
                      CircleProps?.className || ""
                    )}
                    sx={combineSxProps(
                      {
                        marginTop: "0.3rem",
                        width: "0.3rem",
                        mx: "0.5rem",
                      },
                      CircleProps?.sx
                    )}
                  />
                )
              )
            }
          />
        )),
      [items, CircleProps, CircleSlot, disableCircleDot]
    );

    const renderEndElement = useMemo(
      () =>
        endElement ? (
          FooterSectionSlot ? (
            <FooterSectionSlot>{endElement}</FooterSectionSlot>
          ) : (
            <Avatar
              {...EndElemtnProps}
              sx={combineSxProps(
                {
                  background: "transparent",
                  padding: "0",
                  "& .lightBox-root": {
                    width: "100%",
                    height: "100%",

                    "& svg": {
                      fontSize: "1.3rem",
                    },
                  },
                },
                EndElemtnProps?.sx
              )}
            >
              {endElement}
            </Avatar>
          )
        ) : null,
      [endElement, EndElemtnProps, FooterSectionSlot]
    );

    const renderIconElement = useCallback(
      (icon: DetailContentBoxProps["icon"]) =>
        typeof icon === "string" ? (
          <CardMedia {...cardMediaMainProps(icon)} />
        ) : (
          icon
        ),
      [icon]
    );

    const renderIconComponent = useCallback(
      (icon: DetailContentBoxProps["icon"], key: number = 0) =>
        icon ? (
          IconSlot ? (
            <IconSlot key={key}>{renderIconElement(icon)}</IconSlot>
          ) : (
            <Box
              key={key}
              {...IconContainerProps}
              sx={combineSxProps(
                {
                  position: "relative",
                  zIndex: key,
                  marginLeft: "-0.6rem",
                },
                IconContainerProps?.sx
              )}
            >
              <Avatar
                {...IconProps}
                className={clsx(
                  detailContentBoxClasses.icon,
                  IconProps?.className || ""
                )}
                sx={combineSxProps(
                  (theme) => detailContentBoxAvatarStyles(theme),
                  IconProps?.sx
                )}
              >
                {renderIconElement(icon)}
              </Avatar>

              {badgeContent || badgeColor ? (
                BadgeSlot ? (
                  <BadgeSlot>{badgeContent}</BadgeSlot>
                ) : (
                  <LightBox
                    component={Avatar}
                    variant="filled"
                    {...BadgeProps}
                    sx={combineSxProps(
                      detailContentBoxAvatarBadgeStyles,
                      BadgeProps?.sx
                    )}
                    color={badgeColor ?? "default"}
                    className={clsx(
                      detailContentBoxClasses.iconBadge,
                      BadgeProps?.className || ""
                    )}
                  >
                    {badgeContent}
                  </LightBox>
                )
              ) : null}
            </Box>
          )
        ) : null,
      [icon, IconProps]
    );

    return (
      <>
        <Grid
          component={
            selectable
              ? (props) => (
                  <MenuItem
                    {...props}
                    sx={combineSxProps({ minHeight: "auto" }, props?.sx)}
                  />
                )
              : "div"
          }
          tabIndex={1}
          container
          columns={12}
          columnSpacing={"0.95rem"}
          {...props}
          className={clsx(detailContentBoxClasses.root, props?.className || "")}
          sx={combineSxProps(
            (theme) => ({
              flexWrap: "nowrap",
              borderRadius: "0.5rem",
              alignItems: "center",

              ...(focused
                ? {
                    backgroundColor: " #ECEFF0",
                    ...theme.applyStyles("dark", {
                      backgroundColor: primary["D100"],
                    }),
                  }
                : {}),
            }),
            props?.sx
          )}
        >
          {Array.isArray(icon) ? (
            <Box sx={{ display: "flex" }}>
              {icon.map((elm, i) => renderIconComponent(elm, icon.length - i))}
            </Box>
          ) : (
            renderIconComponent(icon)
          )}

          {loading ? (
            <Typography component="div" sx={{ width: "100%" }}>
              <Skeleton sx={{ width: "10rem" }} />
              <Skeleton sx={{ width: "4rem" }} />
            </Typography>
          ) : (
            <>
              <Grid size={12} sx={detailContentBoxStyles}>
                <Box
                  className={detailContentBoxClasses.titleContainer}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    columnGap: "0.4rem",
                    overflow: "hidden",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ minWidth: "0" }}>
                    <Stack
                      flexDirection={"row"}
                      columnGap={"0.5rem"}
                      sx={{ width: "100%" }}
                    >
                      {renderTitle}
                      {renderLightBox}
                    </Stack>

                    {renderCaption}
                  </Box>
                </Box>

                {items.length > 0 && (
                  <Grid
                    container
                    size={12}
                    className={detailContentBoxClasses.itemsContainer}
                    sx={detailContentItemContainerStyles}
                  >
                    {renderItems}
                  </Grid>
                )}

                {children && (
                  <Stack
                    sx={{
                      flexDirection: "row",
                      columnGap: "0.5rem",
                      paddingTop: "1rem",

                      "& button": {
                        textTransform: "capitalize",
                      },
                    }}
                  >
                    {children}
                  </Stack>
                )}
              </Grid>

              {renderEndElement}
            </>
          )}
        </Grid>

        {useDivider ? (
          <Divider
            sx={[
              (theme) => ({
                borderStyle: "dotted",
                background: "rgb(254, 254, 254)",
                marginTop: "-0.5rem",

                ...theme.applyStyles("dark", {
                  background: primary["D200"],
                }),
              }),
            ]}
          />
        ) : null}
      </>
    );
  }
);

const DetailContentItem = memo(
  ({ icon: Icon, value, circle }: ItemsProps & { circle: React.ReactNode }) => (
    <>
      <Stack
        className={detailContentBoxClasses.contentItem}
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "0.35rem",
          columnGap: "0.3rem",

          "& svg": {
            fontSize: "1rem",
          },
        }}
      >
        <Icon className={detailContentBoxClasses.itemIcon} />
        <Typography
          component="span"
          className={detailContentBoxClasses.itemValue}
          sx={(theme) => ({
            fontSize: "0.85rem",
            color: " #3C3F42",
            display: "flex",
            justifyContent: "flex-end",
            lineHeight: "unset",
            marginBottom: "0.2rem",

            ...theme.applyStyles("dark", {
              color: " #F9FFFF",
            }),
          })}
        >
          {value}
        </Typography>
      </Stack>

      {circle && circle}
    </>
  )
);

export default DetailContentBox;
