import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../../features/settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isPending } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const { checkingIn, isCheckingIn } = useCheckin();
  const { settings, isPending: isPendingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
    setBreakfast(booking?.hasBreakfast || false);
  }, [booking?.isPaid, booking?.hasBreakfast]);

  if (isPending || isPendingSettings) return <Spinner />;

  const {
    id: bookingId,

    guests: { fullName },
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreackfastPrice =
    numNights * numGuests * settings?.breakfastPrice;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (breakfast) {
      checkingIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreackfastPrice,
          totalPrice: totalPrice + optionalBreackfastPrice,
        },
      });
    } else {
      checkingIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id='breakfast'
            value={breakfast}
            onChange={() => {
              setBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            checked={breakfast}
          >
            Want to add breakfast for {formatCurrency(optionalBreackfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id='confirm'
          value={confirmPaid}
          onChange={() => setConfirmPaid((paid) => !paid)}
          disabled={confirmPaid || isCheckingIn}
          checked={confirmPaid}
        >
          i confirm that {fullName} has paid
          {!breakfast
            ? ` ${formatCurrency(totalPrice)} `
            : ` ${formatCurrency(totalPrice + optionalBreackfastPrice)} (
          ${formatCurrency(totalPrice)} +
          ${formatCurrency(optionalBreackfastPrice)} ) `}
          for this booking
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
