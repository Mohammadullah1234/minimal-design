"use client";

import * as React from "react";
import { LazyPageLoader } from "@/app/layout/minimalDashboard";
import {
  Check,
  CloseFilled,
  EnvelopeOutlined,
  Mail,
  Stars,
  ViewList,
  ViewListAlt,
  ViewListLayout,
} from "@/UI/icons/minimal";
import Button from "@/UI/material/Button";
import ButtonGroup from "@/UI/material/ButtonGroup";
import Fab from "@/UI/material/Fab";
import IconButton from "@/UI/material/IconButton";
import Stack from "@/UI/material/Stack";
import ToggleButton from "@/UI/material/ToggleButton";
import { CreateNewFolderRounded } from "@mui/icons-material";
import ToggleButtonGroup from "@/UI/material/ToggleButtonGroup";
import { TbBrandWindowsFilled } from "react-icons/tb";
import Checkbox from "@/UI/material/Checkbox";
import FormControlLabel from "@/UI/material/FormControlLabel";
import FormGroup from "@/UI/material/FormGroup";
import Alert from "@/UI/material/Alert";
import Chip from "@/UI/material/Chip";
import Avatar from "@/UI/material/Avatar";
import {
  ComponentColors,
  componentColors,
  componentVariants,
} from "@/UI/material/styles/componentVariantStyles";
import Badge from "@/UI/material/Badge";
import Grid from "@mui/material/Grid";
import capitalize from "@/UI/utils/capitalize";
import Label from "@/UI/material/Label";

const colors: ComponentColors[] = [
  "default",
  "standard",
  "primary",
  "primaryMain",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
];

const variants = [
  "filled",
  "outlined",
  "text",
  "soft",
  "waterSoft",
  "inverted",
];

const AppPage = () => {
  return (
    <LazyPageLoader>
      <Grid container size={12}>
        {variants.map((variant, i) => (
          <Stack
            key={i}
            gap={2}
            width={"100%"}
            my={4}
            flexDirection="row"
            flexWrap={"wrap"}
          >
            {componentColors.map((color, i) => (
              <Label
                color={color}
                key={i}
                variant={variant}
                children={capitalize(color)}
              />
            ))}
          </Stack>
        ))}

        {componentVariants.map((variant, i) => {
          const mainVariant = variant === "filled" ? "filled" : variant;

          return (
            <Stack flexDirection="row" gap={2} mx={5} key={i}>
              <Stack
                flexDirection={"column"}
                flexWrap="wrap"
                alignItems={"center"}
                gap={2}
                my={10}
              >
                {colors.map((color, i) => (
                  <Chip
                    key={i}
                    avatar={<Avatar color={color}>M</Avatar>}
                    label={"Clickable"}
                    color={color}
                    clickable
                    variant={mainVariant}
                  />
                ))}

                <Chip
                  avatar={<Avatar>M</Avatar>}
                  label={"Clickable"}
                  color={"error"}
                  clickable
                  disabled
                  variant={mainVariant}
                />
              </Stack>

              <Stack
                flexDirection={"column"}
                flexWrap="wrap"
                alignItems={"center"}
                gap={2}
                my={10}
              >
                {colors.map((color, i) => (
                  <Chip
                    key={i}
                    avatar={<Avatar color={color}>M</Avatar>}
                    label={"Deletable"}
                    color={color}
                    variant={mainVariant}
                    onDelete={() => null}
                  />
                ))}

                <Chip
                  avatar={<Avatar>M</Avatar>}
                  label={"Clickable"}
                  color={"error"}
                  clickable
                  disabled
                  variant={mainVariant}
                  onDelete={() => null}
                />
              </Stack>
            </Stack>
          );
        })}

        <Stack
          justifyContent={"center"}
          flexDirection={"row"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={2}
          margin={10}
        >
          <FormGroup color="default">
            <FormControlLabel
              control={<Checkbox checked size="small" />}
              label="Small"
            />
            <FormControlLabel
              control={<Checkbox checked size="medium" />}
              label="Medium"
            />
            <FormControlLabel
              control={<Checkbox checked size="large" />}
              label="Large"
            />
          </FormGroup>
        </Stack>

        <Stack
          justifyContent={"center"}
          flexDirection={"row"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={2}
          margin={10}
        >
          <FormGroup color="default">
            {colors.map((color, i) => (
              <FormControlLabel
                key={i}
                control={<Checkbox color={color} checked />}
                label={capitalize(color)}
              />
            ))}
            <FormControlLabel
              control={<Checkbox color="error" checked />}
              label="Disabled"
              disabled
            />
          </FormGroup>
        </Stack>

        <Stack
          justifyContent={"center"}
          flexDirection={"row"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={2}
          margin={10}
        >
          {colors.map((color, i) => (
            <ToggleButton
              key={i}
              value="check"
              size="medium"
              selected
              color={color}
            >
              <Check />
            </ToggleButton>
          ))}
        </Stack>

        <Stack
          justifyContent={"center"}
          flexDirection={"row"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={2}
          margin={10}
        >
          <ToggleButton value="check" size="small" selected color="error">
            <Check />
          </ToggleButton>
          <ToggleButton value="check" size="medium" selected color="error">
            <Check />
          </ToggleButton>
          <ToggleButton value="check" size="medium" color="error">
            <Check />
          </ToggleButton>
          <ToggleButton value="check" size="large" selected color="error">
            <Check />
          </ToggleButton>
          <ToggleButton
            value="check"
            size="large"
            selected
            color="primary"
            disabled
          >
            <Check />
          </ToggleButton>
        </Stack>

        <Stack
          justifyContent={"center"}
          flexDirection={"row"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={2}
          margin={10}
        >
          {colors.map((color, i) => (
            <ToggleButtonGroup
              value={["alignLeft"]}
              size="medium"
              color={color}
              key={i}
            >
              <ToggleButton value="alignLeft">
                <ViewListAlt />
              </ToggleButton>
              <ToggleButton value="alignCenter">
                <ViewList />
              </ToggleButton>
              <ToggleButton value="alignRight">
                <ViewListLayout />
              </ToggleButton>
              <ToggleButton value={"alignJustify"} disabled>
                <TbBrandWindowsFilled />
              </ToggleButton>
            </ToggleButtonGroup>
          ))}
        </Stack>

        {componentVariants.map((variant, i) => (
          <Stack
            justifyContent={"center"}
            flexDirection={"row"}
            flexWrap="wrap"
            alignItems={"center"}
            gap={2}
            mx={10}
            my={2}
            key={i}
          >
            {componentColors.map((color, i) => (
              <ButtonGroup
                variant={variant}
                color={color}
                orientation="horizontal"
                key={i}
              >
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
                <Button>Four</Button>
              </ButtonGroup>
            ))}
          </Stack>
        ))}

        {componentVariants.map((variant, i) => (
          <Stack
            justifyContent={"center"}
            flexDirection={"row"}
            alignItems={"center"}
            flexWrap={"wrap"}
            gap={2}
            mx={10}
            my={2}
            key={i}
          >
            {colors.map((color, i) => (
              <Fab key={i} color={color} variantStyle={variant}>
                <EnvelopeOutlined />
              </Fab>
            ))}
            <Fab color="error" disabled variantStyle={variant}>
              <EnvelopeOutlined />
            </Fab>
          </Stack>
        ))}

        {componentVariants.map((variant, i) => (
          <Stack
            justifyContent={"center"}
            flexDirection={"row"}
            flexWrap={"wrap"}
            alignItems={"center"}
            gap={2}
            mx={10}
            my={5}
            key={i}
          >
            {colors.map((color, i) => (
              <Fab
                key={i}
                color={color}
                variantStyle={variant}
                variant="extended"
              >
                <EnvelopeOutlined />
                {capitalize(color)}
              </Fab>
            ))}
            <Fab
              color="error"
              disabled
              variantStyle={variant}
              variant="extended"
            >
              <EnvelopeOutlined />
              Disabled
            </Fab>
          </Stack>
        ))}

        {componentVariants.map((variant, i) => (
          <Stack
            justifyContent={"center"}
            flexDirection={"row"}
            flexWrap={"wrap"}
            alignItems={"center"}
            gap={2}
            key={i}
          >
            <Fab color="info" variantStyle={variant} size="small">
              <EnvelopeOutlined />
            </Fab>
            <Fab color="info" variantStyle={variant} size="medium">
              <EnvelopeOutlined />
            </Fab>
            <Fab color="info" variantStyle={variant} size="large">
              <EnvelopeOutlined />
            </Fab>
            <Fab
              color="info"
              variantStyle={variant}
              variant="extended"
              size="small"
            >
              <EnvelopeOutlined /> Small
            </Fab>
            <Fab
              color="info"
              variantStyle={variant}
              variant="extended"
              size="medium"
            >
              <EnvelopeOutlined /> Medium
            </Fab>
            <Fab
              color="info"
              variantStyle={variant}
              variant="extended"
              size="large"
            >
              <EnvelopeOutlined /> Large
            </Fab>
          </Stack>
        ))}

        {componentVariants.map((variant, i) => (
          <Stack
            key={i}
            justifyContent={"center"}
            flexDirection={"row"}
            alignItems={"center"}
            flexWrap={"wrap"}
            gap={2}
            margin={10}
          >
            {colors.map((color, i) => (
              <IconButton color={color} variant={variant} key={i}>
                <EnvelopeOutlined />
              </IconButton>
            ))}
            <IconButton color="error" variant={variant} disabled>
              <EnvelopeOutlined />
            </IconButton>
          </Stack>
        ))}

        <Stack
          justifyContent={"center"}
          flexDirection={"row"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={2}
          margin={10}
        >
          <IconButton color="info" size="small">
            <EnvelopeOutlined />
          </IconButton>
          <IconButton color="info" size="medium">
            <EnvelopeOutlined />
          </IconButton>
          <IconButton color="info" size="large">
            <EnvelopeOutlined />
          </IconButton>
        </Stack>

        {componentVariants.map((variant, i) => (
          <Stack flexDirection={"row"} gap={2} mx={10}>
            <Stack
              justifyContent={"center"}
              flexDirection={"row"}
              alignItems={"center"}
              flexWrap={"wrap"}
              gap={2}
              my={5}
            >
              {colors.map((color, i) => (
                <Button variant={variant} color={color} key={i}>
                  {capitalize(color)}
                </Button>
              ))}
              <Button variant={variant} color="error" disabled>
                Disabled
              </Button>
              <Button
                variant={variant}
                component="a"
                color="standard"
                href="https://www.google.com"
              >
                Link
              </Button>
            </Stack>

            <Stack
              justifyContent={"center"}
              flexDirection={"row"}
              alignItems={"center"}
              flexWrap={"wrap"}
              gap={2}
            >
              <Button variant={variant} color="info" size="small">
                Small
              </Button>
              <Button variant={variant} color="info" size="medium">
                Medium
              </Button>
              <Button variant={variant} color="info" size="large">
                Large
              </Button>
            </Stack>

            <Stack
              justifyContent={"center"}
              flexDirection={"row"}
              alignItems={"center"}
              flexWrap={"wrap"}
              gap={2}
            >
              <Button
                variant={variant}
                color="error"
                startIcon={<EnvelopeOutlined />}
              >
                Icon left
              </Button>
              <Button
                variant={variant}
                color="error"
                endIcon={<EnvelopeOutlined />}
              >
                Icon right
              </Button>
            </Stack>

            <Stack
              justifyContent={"center"}
              flexDirection={"row"}
              flexWrap={"wrap"}
              alignItems={"center"}
              gap={2}
            >
              <Button variant={variant} color="info" loading>
                Small
              </Button>
              <Button
                variant={variant}
                color="info"
                size="small"
                loading
                loadingPosition="start"
              >
                Small
              </Button>
              <Button
                variant={variant}
                color="info"
                size="medium"
                loading
                loadingPosition="start"
              >
                Medium
              </Button>
              <Button
                variant={variant}
                color="info"
                size="large"
                loading={true}
                loadingPosition="end"
              >
                Large
              </Button>
            </Stack>
          </Stack>
        ))}

        <Stack
          gap={4}
          margin={10}
          width={"100%"}
          flexDirection="row"
          flexWrap={"wrap"}
        >
          {colors.map((color, i) => (
            <Badge color={color} key={i} badgeContent={4}>
              <EnvelopeOutlined />
            </Badge>
          ))}
        </Stack>

        <Stack
          gap={4}
          margin={10}
          width={"100%"}
          flexDirection="row"
          flexWrap={"wrap"}
        >
          {colors.map((color, i) => (
            <Badge color={color} key={i} badgeContent={4} variant="dot">
              <EnvelopeOutlined />
            </Badge>
          ))}
        </Stack>

        <Stack
          gap={3}
          margin={10}
          width={"100%"}
          flexDirection="row"
          flexWrap={"wrap"}
        >
          {colors.map((color, i) => (
            <Badge
              key={i}
              status="always"
              variant="dot"
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Avatar color={color} key={i}>
                <CreateNewFolderRounded />
              </Avatar>
            </Badge>
          ))}
        </Stack>

        <Stack gap={2} margin={10} width={"100%"}>
          <Alert variant="filled" severity="info">
            Info Alert
          </Alert>
          <Alert variant="filled" severity="success">
            Success Alert
          </Alert>
          <Alert variant="filled" severity="warning">
            Warning Alert
          </Alert>
          <Alert variant="filled" severity="error">
            Error Alert
          </Alert>
        </Stack>
      </Grid>
    </LazyPageLoader>
  );
};

export default AppPage;
