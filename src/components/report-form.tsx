"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitReport, type ReportState } from "@/app/actions";
import { NEED_TYPES, URGENCY } from "@/lib/site";
import { CheckIcon, PinIcon } from "./icons";

const initialState: ReportState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 transition-colors hover:border-leaf focus:border-forest focus:outline-none";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-[#9a5b00]">
      {message}
    </p>
  );
}

export function ReportForm() {
  const [state, formAction, pending] = useActionState(submitReport, initialState);
  const [locating, setLocating] = useState(false);
  const [locNote, setLocNote] = useState<string | null>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.scrollIntoView({ block: "center" });
      successRef.current?.focus();
    }
  }, [state.status]);

  function useMyLocation() {
    if (!("geolocation" in navigator)) {
      setLocNote("Location isn't available on this device. Please type the address.");
      return;
    }
    setLocating(true);
    setLocNote(null);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (locationRef.current) {
          locationRef.current.value = `${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`;
        }
        setLocNote("Coordinates added. A nearby landmark helps volunteers too.");
        setLocating(false);
      },
      () => {
        setLocNote("We couldn't get your location. Please type the address instead.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start rounded-3xl border border-line bg-white p-8 focus:outline-none sm:p-10"
      >
        <span className="flex size-14 items-center justify-center rounded-2xl bg-mint text-forest">
          <CheckIcon className="size-7" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold text-pine">Thank you. Your report is in.</h3>
        <p className="mt-3 max-w-md text-muted">
          A volunteer near the location will review it and plan an on-ground visit. Keep this
          reference handy if you contact us:
        </p>
        <p className="mt-5 rounded-xl bg-mint px-4 py-2 font-mono text-lg font-medium tracking-wide text-forest">
          {state.reference}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-8 rounded-full border border-forest px-5 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
        >
          Report another person
        </button>
      </div>
    );
  }

  const e = state.errors ?? {};

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-3xl border border-line bg-white p-6 sm:p-10"
      onSubmit={(ev) => {
        // Submit manually so React doesn't reset the fields when validation fails.
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        startTransition(() => formAction(data));
      }}
    >
      {state.status === "error" && state.message && (
        <p role="alert" className="mb-8 rounded-xl bg-sun/25 px-4 py-3 text-sm text-ink">
          {state.message}
        </p>
      )}

      {/* Step 1 */}
      <fieldset aria-describedby={e.needs ? "needs-error" : undefined}>
        <legend className="flex items-center gap-3 text-base font-medium text-pine">
          <StepNo n={1} /> What kind of help do they need?
        </legend>
        <p className="mt-1 pl-10 text-sm text-muted">Choose all that apply.</p>
        <div className="mt-4 flex flex-wrap gap-2.5 sm:pl-10">
          {NEED_TYPES.map((n) => (
            <label key={n.value} className="cursor-pointer">
              <input type="checkbox" name="needs" value={n.value} className="peer sr-only" />
              <span className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors peer-checked:border-forest peer-checked:bg-forest peer-checked:text-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-forest hover:border-forest">
                {n.label}
              </span>
            </label>
          ))}
        </div>
        <div className="sm:pl-10">
          <FieldError id="needs-error" message={e.needs} />
        </div>
      </fieldset>

      <hr className="my-8 border-line" />

      {/* Step 2 */}
      <fieldset>
        <legend className="flex items-center gap-3 text-base font-medium text-pine">
          <StepNo n={2} /> Where can they be found?
        </legend>
        <div className="mt-4 grid gap-4 sm:pl-10">
          <div>
            <label htmlFor="location" className="mb-2 block text-sm text-muted">
              Address or area
            </label>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <input
                ref={locationRef}
                id="location"
                name="location"
                required
                placeholder="e.g. Near Gate 2, Central Bus Stand, Pune"
                className={inputClass}
                aria-invalid={!!e.location}
                aria-describedby={e.location ? "location-error" : undefined}
              />
              <button
                type="button"
                onClick={useMyLocation}
                disabled={locating}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-line px-4 py-3 text-sm font-medium text-forest transition-colors hover:border-forest disabled:opacity-60"
              >
                <PinIcon className="size-4" />
                {locating ? "Locating…" : "Use my location"}
              </button>
            </div>
            {locNote && <p className="mt-2 text-sm text-muted">{locNote}</p>}
            <FieldError id="location-error" message={e.location} />
          </div>
          <div>
            <label htmlFor="landmark" className="mb-2 block text-sm text-muted">
              Nearby landmark <span className="text-muted/70">(optional)</span>
            </label>
            <input
              id="landmark"
              name="landmark"
              placeholder="e.g. Opposite the blue pharmacy"
              className={inputClass}
            />
          </div>
        </div>
      </fieldset>

      <hr className="my-8 border-line" />

      {/* Step 3 */}
      <fieldset>
        <legend className="flex items-center gap-3 text-base font-medium text-pine">
          <StepNo n={3} /> Tell us what you saw
        </legend>
        <div className="mt-4 grid gap-4 sm:pl-10">
          <div>
            <label htmlFor="description" className="mb-2 block text-sm text-muted">
              Short description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              placeholder="e.g. An elderly man sleeping on the footpath for the past week, seems unwell and has no blanket."
              className={`${inputClass} resize-y`}
              aria-invalid={!!e.description}
              aria-describedby={e.description ? "description-error" : undefined}
            />
            <FieldError id="description-error" message={e.description} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="people" className="mb-2 block text-sm text-muted">
                How many people?
              </label>
              <input
                id="people"
                name="people"
                type="number"
                min={1}
                max={500}
                defaultValue={1}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="urgency" className="mb-2 block text-sm text-muted">
                How urgent is it?
              </label>
              <div className="relative">
                <select
                  id="urgency"
                  name="urgency"
                  defaultValue="week"
                  className={`${inputClass} cursor-pointer appearance-none pr-12`}
                >
                  {URGENCY.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
                <svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <hr className="my-8 border-line" />

      {/* Step 4 */}
      <fieldset>
        <legend className="flex items-center gap-3 text-base font-medium text-pine">
          <StepNo n={4} /> Your details <span className="font-normal text-muted">(optional)</span>
        </legend>
        <p className="mt-1 pl-10 text-sm text-muted">
          So a volunteer can call if they can&apos;t find the person.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:pl-10">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-muted">
              Your name
            </label>
            <input id="name" name="name" autoComplete="name" className={inputClass} />
          </div>
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm text-muted">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className={inputClass}
            />
          </div>
        </div>
      </fieldset>

      <div className="mt-8 sm:pl-10">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 size-4.5 shrink-0 accent-forest"
            aria-invalid={!!e.consent}
            aria-describedby={e.consent ? "consent-error" : undefined}
          />
          <span>
            I confirm this report is genuine. I understand the details will be shared only with
            verified volunteers to help this person.
          </span>
        </label>
        <FieldError id="consent-error" message={e.consent} />

        <button
          type="submit"
          disabled={pending}
          className="mt-8 w-full rounded-full bg-forest px-8 py-4 text-base font-medium text-cream transition-colors hover:bg-pine disabled:opacity-70 sm:w-auto"
        >
          {pending ? "Sending report…" : "Submit report"}
        </button>
      </div>
    </form>
  );
}

function StepNo({ n }: { n: number }) {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-mint text-sm font-semibold text-forest">
      {n}
    </span>
  );
}
